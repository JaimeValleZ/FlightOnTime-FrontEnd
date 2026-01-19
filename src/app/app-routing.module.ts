import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth/auth.guard';
import { DetalleVueloComponent } from './pages/detalle-vuelo/detalle-vuelo.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { noAuthGuard } from './auth/no-auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { PublicLayoutComponent } from './pages/public-layout/public-layout.component';

const routes: Routes = [

    {
    path: 'info',
    component: PublicLayoutComponent,
    children: [
      { path: 'sobre-nosotros', component: SobreNosotrosComponent }
    ]
  },

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
        component: DashboardComponent
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
