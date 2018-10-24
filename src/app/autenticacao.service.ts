import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
    public cadastrarUsuario (usuario: Usuario) {
      console.log('Service', usuario);

      firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {
          // remover a senha do atributo usuario
          delete usuario.senha;
          // registrando dados complementares do usuario no path email na base64
          firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set( usuario );
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }
}
