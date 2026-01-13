import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(data: { correo: string; contrasenha: string }) {
    return this.http.post<{ token: string }>(this.API, data)
      .pipe(
tap(res => {
  console.log('TOKEN RECIBIDO:', res.token);
  localStorage.setItem('token', res.token);
})
        
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
