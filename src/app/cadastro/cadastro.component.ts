import { Component } from '@angular/core';
import { AccountService } from '../svc/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent{

  nome: string = '';
  email: string = '';
  senha: string = '';
  confSenha: string = '';
  isRegisterInvalid: boolean = false;

  constructor(
    private authService: AccountService,
    private router: Router
    ) {}


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
    if (this.isFormularioInvalid()) {
      this.isRegisterInvalid = true;
      return;
    }
    this.authService.register(this.email, this.nome, this.senha).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.isRegisterInvalid = true;
        console.error(error);
      }
    );
  }
}
