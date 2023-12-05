import { Component } from '@angular/core';
import { AccountService } from '../svc/account.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  nome: string = '';
  email: string = '';
  senha: string = '';
  confSenha: string = '';

  constructor(private authService: AccountService) {}

  isFormularioInvalid(): boolean {
    if (this.nome === '') {
      return true;
    }
    if (this.email === '' || !this.email.includes('@')) {
      return true;
    }
    if (this.senha === '' || this.senha.length < 4) {
      return true;
    }
    if (this.senha !== this.confSenha) {
      return true;
    }
    return false;
  }

  onRegister(): void {
    this.authService.register(this.nome, this.email, this.senha).subscribe(
      response => {
        // Trate a resposta aqui
      },
      error => {
        // Trate os erros aqui
      }
    );
  }
}
