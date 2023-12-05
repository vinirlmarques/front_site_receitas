import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent {
  isMenuVisible: boolean = false;
  currentView: 'home' | 'myRecipes' | 'addRecipe' | 'dados' = 'home';
  username: string = '';
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
  ) {}

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  onLogout(): void {
    const confirmLogout = confirm('Você tem certeza que deseja sair?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  showHome(): void {
    this.currentView = 'home';
  }

  showMyRecipes(): void {
    this.currentView = 'myRecipes';
  }

  showAddRecipe(): void {
    this.currentView = 'addRecipe';
  }

  showDados(){
    this.currentView = 'dados';
  }

  onUpdateDados(): void {
    
  }
}
