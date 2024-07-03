import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';
import { UserService } from 'src/app/services/user.service';
import { InfoTablaCriterios, InfoTablaEstadisticas, InfoTablaUltimosRegistros, User } from '../interfaces/forms';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent {
//Declaracion de variables para su posterior almacenado de informacion
 mostrarNombreGestor!: string;
 datosGestorDesplegable!: User[];
 datosEstadisticas!: InfoTablaCriterios[];
 registrosFormularios!:  InfoTablaUltimosRegistros[];
 datosEstadisticasGestor!: InfoTablaEstadisticas[];
 datosEstadisticasGeneral!: InfoTablaEstadisticas[];
 editar: boolean = false;
 visualizar: boolean = false;
 utilizar: boolean = false;
 gestorSeleccionado!: string
 hide = true;

 //Columnas utilizadas para estructurar las tablas de Angular Material
 columnasEstadisticas: string[] = ['Criterio', 'Item', 'Fallos'];
 columnasRegistros: string[] = ['Fecha', 'Evaluador', 'Nota Final'];
 colummasEstadisticasForm: string[] = ['Fecha', 'NombreGestor', 'IdInteraccion', 'NumeroInteraccion', 'Observaciones', 'Evaluador', 'NotaFinal', 'Item', 'Cumple']

  //Inyeccion de dependecias y servicios (Desde aqui se traen las peticiones http)
  constructor(private fb: FormBuilder, private userService: UserService, private estadisticasService: FormularioService) {

  }

  ngOnInit(): void {
    //Inicializacion de desplegable de gestores y el manejo de roles
    this.obtenerDesplegableGestores()
    this.obtenerGestorUnico()
    this.manejoRoles()
    this.obtenerEstadisticasGeneral()
  }
  //Formulario para envio de datos de las estadisticas
  public formEstadisticas = this.fb.group({
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    gestor: ['',[Validators.required]]

  })

  //Llamada del metodo para traer gestores del desplegable
  obtenerDesplegableGestores () {
    this.userService.getInformacionGestor().subscribe(res => {
      this.datosGestorDesplegable = res

    })
  }

  //Se hace la llamada del metodo de lector de usuario del Localstorage para impregnarlo ahi mismo
  obtenerGestorUnico () {
    const gestor = this.userService.leerUsuario()
    this.gestorSeleccionado = gestor.message[0].Usuario
  }


  obtenerEstadisticasGeneral () {
    this.estadisticasService.getEstadisticasGeneral().subscribe(res => {
      this.datosEstadisticasGeneral = res
      console.log(this.datosEstadisticasGeneral);

    })
  }


  //El envio de estadisticas para traer su posterior informacion
  envioEstadisticas() {
    const datosEstadisticas = this.formEstadisticas.value
    const gestorSeleccionado = datosEstadisticas.gestor
    this.mostrarNombreGestor = gestorSeleccionado!

    this.estadisticasService.postEnviarEstadisticas(datosEstadisticas).subscribe(res => {
      this.datosEstadisticas = res


    })

    this.estadisticasService.postRecibirRegistros(datosEstadisticas).subscribe( resultado => {
      this.registrosFormularios = resultado
    })

    this.estadisticasService.postEstadisticasGestor(datosEstadisticas).subscribe( resultado => {
      this.datosEstadisticasGestor = resultado
    })
    // validador para que se puedan visualizar la exportacion de datos y los registros de formularios despues de hacer la consulta
    this.utilizar = true
  }

  //Logica para el manejo de roles y ocultacion o muestra de informacion
  manejoRoles() {
    const rol = this.userService.leerUsuario()
    const rolSeleccionado = rol.message[0].Roll
    if (rolSeleccionado === 'Admin')
    {
      this.editar = true
      this.visualizar = true

    } else if (rolSeleccionado === 'Evaluador') {
      this.editar = false
      this.visualizar = true
    } else
    {
      this.editar = false
      this.visualizar = false
    }
  }



}



