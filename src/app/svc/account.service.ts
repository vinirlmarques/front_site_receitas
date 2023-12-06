import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private apiUrl = 'http://localhost:7600';

  constructor(private http: HttpClient) { }

  // Método para obter o token do localStorage
  private getToken(): string {
    return localStorage.getItem('token_recipe') || '';
  }

  // Método para configurar os headers da requisição com o token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, { email, username, password });
  }

  getAllUsers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

  updateUser(username?: string, password?: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body: any = {};
    if (username) body.username = username;
    if (password) body.password = password;
    return this.http.put<any>(`${this.apiUrl}/users`, body, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token_recipe')) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/user-info`, { headers });
  }
}