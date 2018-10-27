import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar() {
    console.log(this.formulario);
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha);
  }

}
