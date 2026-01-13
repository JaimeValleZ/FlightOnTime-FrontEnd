import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertUtil } from '../../utils/alert.util';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenha: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          AlertUtil.success('Bienvenido', 'Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.loading = false;
          AlertUtil.error('Error', 'Credenciales incorrectas');
        }
      });
  }
}
