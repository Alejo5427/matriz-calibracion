export interface User {
  Usuario: string
}

export interface Login {
  Cedula: number
  Contrasena: string
}

export interface  datosUsuarioInicioSesion{
  message: []
  Cedula: number
  Contrasena: string
  Email: string
  Roll: string
  Usuario: string
  habilitado: boolean
  id: number
}

export interface DatosLocalStorage {
  message: datosUsuarioInicioSesion
}

export interface CrearUsuario {
  Usuario: string
  Contrasena: string
  Cedula: number
  Rol: string
}

export  interface EditarUsuario {
  UsuarioEdit: string
  ContrasenaEdit: string
  CedulaEdit: string
  RolEdit: string
}

export interface Formulario {
  evaluador: string
fechaInteraccion: Date
idInteraccion: string

item1: string
item2: string
item3: string
item4: string
item5: string
item6: string
item7: string
item8: string
item9: string
item10: string
item11: string
item12: string
item13: string
item14: string
item15: string
item16: string
item17: string
item18: string
item19: string
item20: string
item21: string
item22: string
item23: string
item24: string
item25: string
item26: string
item27: string
item28: string
item29: string
item30: string
item31: string
item32: string
item33: string
item34: string
item35: string
item36: string
item37: string
item38: string
item39: string
item40: string

nombre: string
numeroContacto: number
observaciones: string
notaFinal: number
}

export interface envioDatosEstadisticas {
  fechaInicio?: Date | null | undefined;
  fechaFin?: Date | null | undefined;
  gestor?: string | null | undefined;
}

export interface EnvioFormulario {
  formulario: Formulario
  notaFinal: number
}


export interface InfoTablaCriterios {
  Cod_Item: number
  Nom_Criterio: string
  total: number
}

export interface InfoTablaUltimosRegistros {
  NumeroFormulario: number
  Evaluador: string
  Fecha: Date
  NotaFinal: number
}

export interface InfoTablaEstadisticas {
  Fecha: Date
  NombreGestor: string
  ID_Interaccion: string
  NumeroInteraccion: string
  Observaciones?: string
  Evaluador: string
  NotaFinal: number
  Nombre_Item: string
  Cumple: number
}

export interface InfoTablaUsuariosAjustes {
  id: number
  Usuario: string
  Email: null
  Contrasena: string
  Roll: string
  Cedula: number
  habilitado: boolean
  posicion: number
}

export interface MensajeRetornoBackEnd {
  message?: string
  error?:  string
}
