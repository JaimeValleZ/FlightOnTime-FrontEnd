import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth/auth.guard';
import { VuelosComponent } from './pages/vuelos/vuelos.component';
import { DetalleVueloComponent } from './pages/detalle-vuelo/detalle-vuelo.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { noAuthGuard } from './auth/no-auth.guard';

const routes: Routes = [


  // 🔓 AUTH (solo si NO está logueado)
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // 🔐 Protegidas
   // 🔐 PROTEGIDAS (CON NAVBAR)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [

      // redirección inicial
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: VuelosComponent
      },

      {
        path: 'vuelo',
        component: DetalleVueloComponent
      }

      // si luego quieres dinámico:
      // { path: 'vuelo/:iata', component: DetalleVueloComponent }
    ]
  },

  // ❌ Not found
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
