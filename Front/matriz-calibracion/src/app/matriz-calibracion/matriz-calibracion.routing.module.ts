import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioMatrizComponent } from './formulario-matriz/formulario-matriz.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard, AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [

  {
    path: 'Formulario',
    component: FormularioMatrizComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'Estadisticas',
    component: EstadisticasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'Ajustes',
    component: AjustesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'Login',
    component: LoginComponent
  },

  {
    path: '**',
    redirectTo: 'Estadisticas'
  },



]



@NgModule({

  imports: [
    RouterModule.forChild( routes),

  ],
  exports: [
    RouterModule,
  ]

})
export class MatrizCalibracionRoutingModule { }
