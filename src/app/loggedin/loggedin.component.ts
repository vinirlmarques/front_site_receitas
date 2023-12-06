import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../svc/account.service';
import { RecipesService } from '../svc/recipes.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent implements OnInit{
  isMenuVisible: boolean = false;
  currentView: 'home' | 'myRecipes' | 'addRecipe' | 'editRecipe' | 'dados' = 'home';
  username: string = '';
  email: string = '';
  senha: string = '';
  recipes: any[] = [];
  newRecipe = { title: '', ingredients: '', description: '' };
  editingRecipe: any = null;


  constructor(
    private router: Router,
    private authService: AccountService,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Carregar dados do usuário
    this.authService.getUserInfo().subscribe(
      data => {
        this.username = data.userInfo.username;
      },
      error => {
        console.error('Erro ao carregar dados do usuário', error);
      }
    );

    const savedView = localStorage.getItem('currentView');
    if (savedView && this.isValidView(savedView)) {
      this.currentView = savedView;
      localStorage.removeItem('currentView'); // Remove o valor salvo
    } else {
      this.currentView = 'home'; // Valor padrão se o valor salvo não for válido
    }

    this.loadMyRecipes(); // Carregar receitas ao iniciar
  }

  isValidView(view: string): view is 'home' | 'myRecipes' | 'addRecipe' | 'editRecipe' | 'dados' {
    return ['home', 'myRecipes', 'addRecipe', 'editRecipe', 'dados'].includes(view);
  }
  

  // Carregar receitas do usuário
  loadMyRecipes(): void {
    this.recipesService.getUserRecipes().subscribe(
      data => {
        this.recipes = data;
        console.log('Receitas carregadas', this.recipes);
      },
      error => {
        console.error('Erro ao carregar receitas', error);
      }
    );
  }

  editRecipe(recipe: any): void {
    this.editingRecipe = { ...recipe };
    this.currentView = 'editRecipe';
  }
  
  
  deleteRecipe(recipeId: number): void {
    if (confirm('Você tem certeza que deseja deletar esta receita?')) {
      this.recipesService.deleteRecipe(recipeId).subscribe(
        () => {
          this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
        },
        error => {
          console.error('Erro ao deletar receita', error);
        }
      );
    }
  }

  addRecipe(): void {
    this.recipesService.createRecipe(this.newRecipe).subscribe(
      data => {
        // Adiciona a nova receita ao array de receitas
        this.recipes.push(data.recipe);
        // Limpa o formulário
        this.newRecipe = { title: '', ingredients: '', description: '' };
        // Opcional: Mudar para a visão de 'myRecipes' ou mostrar mensagem de sucesso
        this.showMyRecipes();
      },
      error => {
        console.error('Erro ao adicionar receita', error);
        // Opcional: Mostrar mensagem de erro
      }
    );
  }

  updateRecipe(): void {
    this.recipesService.updateRecipe(this.editingRecipe.id, this.editingRecipe).subscribe(
      updatedRecipe => {
        const index = this.recipes.findIndex(r => r.id === this.editingRecipe.id);
        if (index !== -1) {
          this.recipes[index] = updatedRecipe;
        }
        alert('Receita atualizada com sucesso!');
        localStorage.setItem('currentView', 'myRecipes'); // Salva no localStorage
        window.location.reload();
      },
      error => {
        console.error('Erro ao atualizar a receita', error);
      }
    );
  }
  


  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  onLogout(): void {
    const confirmLogout = confirm('Você tem certeza que deseja sair?');
    if (confirmLogout) {
      localStorage.removeItem('token_recipe');
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
    this.authService.updateUser(this.username, this.senha).subscribe(
      response => {
        alert('Dados atualizados com sucesso!');
      },
      error => {
        console.error('Erro ao atualizar os dados do usuário', error);
        alert('Erro ao atualizar os dados do usuário (email ou username já existem)');
      }
    );
  }
  
}
