import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VuelosComponent } from './vuelos/vuelos.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "../app-routing.module";
import { DetalleVueloComponent } from './detalle-vuelo/detalle-vuelo.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';



@NgModule({
declarations: [
    VuelosComponent,
    RegisterComponent,
    LoginComponent,
    DetalleVueloComponent,
    LayoutComponent,
    NavbarComponent,
    AuthNavbarComponent,
    AuthLayoutComponent,
    DashboardComponent,
    SobreNosotrosComponent,
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
]
})
export class PagesModule { }
