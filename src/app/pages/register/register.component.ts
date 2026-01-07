import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { AlertUtil } from '../../utils/alert.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  submit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      AlertUtil.warning(
        'Formulario incompleto',
        'Por favor revisa los campos obligatorios'
      );
      return;
    }

    if (this.registerForm.value.contrasenha !== this.registerForm.value.confirmar) {
      AlertUtil.warning(
        'Validación',
        'Las contraseñas no coinciden'
      );
      return;
    }

    this.loading = true;
    AlertUtil.loading('Registrando usuario...');

    const { nombre, apellido, correo, contrasenha } = this.registerForm.value;

    this.usuarioService.register({ nombre, apellido, correo, contrasenha })
      .subscribe({
        next: (resp: any) => {
          this.loading = false;
          AlertUtil.close();

          AlertUtil.success(
            'Registro exitoso',
            resp?.message || 'Usuario registrado correctamente'
          );

          this.registerForm.reset();
        },
        error: (err) => {
          this.loading = false;
          AlertUtil.close();

          const mensaje =
            err?.error?.message ||
            err?.error ||
            'Error al registrar usuario';

          AlertUtil.error(
            'Error al registrar',
            mensaje
          );
        }
      });
  }
}
