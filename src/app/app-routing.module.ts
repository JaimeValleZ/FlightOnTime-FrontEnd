import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import  { VuelosComponent } from './pages/vuelos/vuelos.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  /*
  {
    path: '**',
    redirectTo: 'register'
  },*/
  
  {
    path: 'vuelos/:airline', component: VuelosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
