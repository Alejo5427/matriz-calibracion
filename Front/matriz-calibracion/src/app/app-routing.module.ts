import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginComponent } from './matriz-calibracion/login/login.component';


const routes: Routes = [

//Rutas del proyecto
{
  //Ruta de matriz de calibracion
  path: 'matrizCalibracion',
  loadChildren: () => import('./matriz-calibracion/matriz-calibracion.module').then(m => m.MatrizCalibracionModule),

},

{
  path: '**',
  redirectTo: 'matrizCalibracion'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

