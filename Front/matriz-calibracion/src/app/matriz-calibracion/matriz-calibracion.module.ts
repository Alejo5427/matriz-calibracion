import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MatrizCalibracionRoutingModule } from './matriz-calibracion.routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormularioMatrizComponent } from './formulario-matriz/formulario-matriz.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { LoginComponent } from './login/login.component';



import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatSelectModule} from '@angular/material/select';
import { siCumpleCondicion } from './pipes/condicion-form.pipe';


@NgModule({
  declarations: [
    FormularioMatrizComponent,
    EstadisticasComponent,
    AjustesComponent,
    LoginComponent,
    siCumpleCondicion

  ],
  imports: [
    CommonModule,
    MatrizCalibracionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatSelectModule
  ],
  exports: [
  ]
})
export class MatrizCalibracionModule { }
