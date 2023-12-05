import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoggedinComponent } from './loggedin/loggedin.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: HomeComponent },
  { path: 'loggedin', component: LoggedinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
