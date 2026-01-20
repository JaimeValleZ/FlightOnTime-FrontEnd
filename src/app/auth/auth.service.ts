import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { isTokenExpired } from '../utils/jwt.util';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(data: { correo: string; contrasenha: string }) {
    return this.http.post<{ token: string }>(this.API, data)
      .pipe(
        tap(res => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null; // Si estamos en el servidor, devolvemos nulo sin explotar
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    if (isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }
}