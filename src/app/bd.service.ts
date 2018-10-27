import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

  constructor(
    private progresso: Progresso
  ) {}

  public publicar(publicacao: any) {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo})
            .then((resposta: any) => {
              const nomeImagem = resposta.key;

              firebase.storage().ref()
                .child(`imagens/${nomeImagem}`)
                .put(publicacao.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                  // acompanhamento progresso
                  (snapshot: any) => {
                    this.progresso.status = 'andamento';
                    this.progresso.estado = snapshot;
                    // console.log(snapshot);
                  },
                  (error) => {
                    this.progresso.status = 'erro';
                    // console.log(error);
                  },
                  // finalizacao do progresso
                  () => {
                    this.progresso.status = 'concluido';
                    // console.log('upload completo');
                  }
                );
            });
  }

  public consultarPublicacoes(email: string): Promise<any> {
    return new Promise ((resolve, reject) => {
      // consultar publicacoes (database)
      firebase.database().ref(`publicacoes/${btoa(email)}`)
      .orderByKey()
      .once('value')
      .then((snapshot: any) => {
        // console.log(snapshot.val());
        // tslint:disable-next-line:prefer-const
        let publicacoes: Array<any> = [];

        snapshot.forEach((childSnapshot: any) => {

          // tslint:disable-next-line:prefer-const
          let publicacao = childSnapshot.val();
          publicacao.key = childSnapshot.key;
          publicacoes.push(publicacao);
        });
        // resolve(publicacoes);
        return publicacoes.reverse();
      })
      .then((publicacoes: any) => {

        publicacoes.forEach((publicacao) => {
          // consultar a url da imagem
          firebase.storage().ref()
          .child(`imagens/${publicacao.key}`)
          .getDownloadURL()
          .then((url: string) => {

            publicacao.url_imagem = url;

            // consultar nome de usuario
            firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
              .once('value')
              .then((snap: any) => {
                publicacao.nome_usuario = snap.val().nome_usuario;
              });
          });
        });

        resolve(publicacoes);

      });
    });
  }
}
