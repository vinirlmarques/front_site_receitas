import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:7600'; // Substitua com a URL do seu backend

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token_recipe');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes/${id}`);
  }

  createRecipe(recipeData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/recipes`, recipeData, { headers });
  }

  updateRecipe(id: number, recipeData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/recipes/${id}`, recipeData, { headers });
  }

  deleteRecipe(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/recipes/${id}`, { headers });
  }

  getUserRecipes(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/user-recipes`, { headers });
  }
}
