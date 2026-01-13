import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

  if (req.url.includes('/login') || req.url.includes('/usuarios/register')) {
    return next.handle(req);
  }

  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next.handle(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
}

}
