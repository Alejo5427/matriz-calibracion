import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearUsuario, EditarUsuario, InfoTablaUsuariosAjustes, Login, MensajeRetornoBackEnd, User } from '../matriz-calibracion/interfaces/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL =  'http://192.168.7.106:8080/usuario'

  guardarUsuario: any;
  Editar: boolean = false
  Visualizar: boolean = false

  constructor(private http: HttpClient) { }

  //Servicio para obtener los usuarios habilitados para mostrarlos en Ajustes
  getUsuariosHabilitados(): Observable<InfoTablaUsuariosAjustes[]> {
    return this.http.get<InfoTablaUsuariosAjustes[]>(`${this.apiURL}/datosUsuariosHabilitados`)
  }
  //Servicio para obtener los usuarios inhabilitados para mostrarlo en la tabla de Ajustes
  getUsuariosInhabilitados(): Observable<InfoTablaUsuariosAjustes[]> {
    return this.http.get<InfoTablaUsuariosAjustes[]>(`${this.apiURL}/datosUsuariosInhabilitados`)
  }

  //Servicio que trae todos los gestores que estan habilitados
  getInformacionGestor(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiURL}/informacionGestor`)
  }

  //servicio que trae todos los evaluadores para mostrarlos en el desplegable
  getInformacionEvaluador(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiURL}/informacionEvaluador `)
  }

  //Servicio que valida si los datos del login son correctos para dejarlos entrar
  postLogin(datos: Login): Observable<MensajeRetornoBackEnd> {

    return this.http.post<MensajeRetornoBackEnd>(`${this.apiURL}/login`,datos)
  }

  //Servicio que se llama para validar la creacion de los usuarios
  postCrearUsuario(datosUsuario: CrearUsuario): Observable<MensajeRetornoBackEnd> {
    return this.http.post<MensajeRetornoBackEnd>(`${this.apiURL}/crearUsuario`, datosUsuario)
  }

  //Servicio que funciona para poder hacer el cambio de estado del usuario en cuestion
  postEstadoUsuario(estado: string,  id: number): Observable<MensajeRetornoBackEnd>{
    return this.http.post<MensajeRetornoBackEnd>(`${this.apiURL}/estadoUsuario/${id}`, estado)
  }

  //Servicio para editar los campos requeridos del usuario
  putEditarUsuario(datosActualizar: EditarUsuario, id: number): Observable<MensajeRetornoBackEnd>{
    return this.http.put<MensajeRetornoBackEnd>(`${this.apiURL}/editarUsuario/${id}`, datosActualizar)
  }

  //Metodo para leer el usuario del localstorage
  leerUsuario() {
    if (JSON.parse(localStorage.getItem('Date')!)) {

      this.guardarUsuario = JSON.parse(localStorage.getItem('Date')!);



    } else {
      this.guardarUsuario  = ''
    }
    return this.guardarUsuario
  }


  //Metodo que valida si el usuario esta autentificado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('Date');
  }
  //Metodo que verifica si el usuario es Administrador
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






