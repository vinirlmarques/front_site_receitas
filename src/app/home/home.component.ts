import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../svc/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  email: string = '';
  password: string = '';

  constructor(
    @Inject(Router) private router: Router,
    private authService: AccountService
  ) {}

  goToCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        
      },
      error => {
      }
    );
  }
}
