import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Permite acessar componente filho
  @ViewChild('publicacoes') public publicacoes: any;

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public sair() {
    this.autenticacao.sair();
  }

  atualizarTimeLine() {
    // acessando metodo componente filho
    this.publicacoes.atualizarTimeLine();
  }
}
