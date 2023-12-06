import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../svc/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: string = '';
  password: string = '';
  invalidLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AccountService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/loggedin']);
    }
  }

  goToCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  onLogin(event: Event): void {
    event.preventDefault(); // Impede a ação padrão do formulário.
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token_recipe', response.token); // Salva o token no localStorage.
        this.router.navigate(['/loggedin']); // Redireciona o usuário para o dashboard, por exemplo.
      },
      error => {
        this.invalidLogin = true;
        console.error(error);
      }
    );
  }
}
