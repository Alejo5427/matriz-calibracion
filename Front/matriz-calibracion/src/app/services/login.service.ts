import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL =  'http://localhost:8080/usuario'

  guardarUsuario: any;
  Editar: boolean = false
  Visualizar: boolean = false

  constructor(private http: HttpClient) { }


  postLogin(datos: any): Observable<any> {

    return this.http.post<any>(`${this.apiURL}/login`,datos)
  }


  postCrearUsuario(datosUsuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/crearUsuario`, datosUsuario)
  }

  postCambiarPassword(password: any, id: any): Observable<any>{
    return this.http.post<any>(`${this.apiURL}/cambioPassword/${id}`, password)
  }


  getInformacionGestor(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/informacionGestor`)
  }

  getInformacionEvaluador(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/informacionEvaluador `)
  }

  putEditarUsuario(datosActualizar: any): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/editarUsuario`, datosActualizar)
  }

  postEliminarUsuario(datosEliminar: any): Observable<any>{
    return this.http.post<any>(`${this.apiURL}/eliminarUsuario`, datosEliminar)
  }


  leerUsuario() {
    if (JSON.parse(localStorage.getItem('Date')!)) {

      this.guardarUsuario = JSON.parse(localStorage.getItem('Date')!);
    } else {
      this.guardarUsuario  = ''
    }
    return this.guardarUsuario
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('Date');
  }

  isAdmin() {
     const user = this.leerUsuario()
     const GestorSeleccionado = user.message[0].Roll
     if (GestorSeleccionado === 'Admin') {
      return true;
     } else{

      return false;
     }
  }










}






