import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvioFormulario, InfoTablaCriterios, InfoTablaEstadisticas, InfoTablaUltimosRegistros, MensajeRetornoBackEnd } from '../matriz-calibracion/interfaces/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  //Declaracion de la URL
   private apiURL =  'http://192.168.7.106:8080/formulario'

  constructor(private http: HttpClient) {}

  getEstadisticasGeneral(): Observable<InfoTablaEstadisticas[]>{
    console.log('Llegue hasta aqui');
    return this.http.get<any>(`${this.apiURL}/estadisticasFormGeneral`)

  }

  //Service de enviar formulario
  postEnviarFormulario(datosFormulario: EnvioFormulario): Observable<MensajeRetornoBackEnd[]> {
    return this.http.post<MensajeRetornoBackEnd[]>(`${this.apiURL}/envioFormulario`, datosFormulario)
  }

  //Servicio de enviar estadisticas
  postEnviarEstadisticas(datosEstadisticas: any): Observable<InfoTablaCriterios[]>{
    return this.http.post<InfoTablaCriterios[]>(`${this.apiURL}/estadisticas`, datosEstadisticas)
  }

  //Servicio de recibir los registros del gestor formulario
  postRecibirRegistros(datosEstadisticasGestor: any): Observable<InfoTablaUltimosRegistros[]>{
    return this.http.post<InfoTablaUltimosRegistros[]>(`${this.apiURL}/registrosForm`, datosEstadisticasGestor)
  }

  postEstadisticasGestor(datosEstadisticasGestor: any): Observable<InfoTablaEstadisticas[]>{
    return this.http.post<InfoTablaEstadisticas[]>(`${this.apiURL}/estadisticasFormGestor`, datosEstadisticasGestor)
  }
}
