import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [

  // 🔓 RUTAS PÚBLICAS
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  // 🔐 RUTAS PROTEGIDAS
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
       path: 'dashboard',
        loadComponent: () =>
          import('./pages/vuelos/vuelos.component')
            .then(m => m.VuelosComponent)
      },
    ]
  },

  // ❌ NOT FOUND
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
