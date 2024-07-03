import { EnvioFormulario, Formulario, MensajeRetornoBackEnd } from './../interfaces/forms';
import { Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

import { FormularioService } from 'src/app/services/formulario.service';
import Swal from 'sweetalert2';
import { User } from '../interfaces/forms';


@Component({
  selector: 'app-formulario-matriz',
  templateUrl: './formulario-matriz.component.html',
  styleUrls: ['./formulario-matriz.component.css']
})
export class FormularioMatrizComponent {
  // Declaracion de variables
  notaTotal: number = 100;
  porcentajeCrit1: number = 5;
  porcentajeCrit2: number = 5;
  porcentajeCrit3: number = 5;
  porcentajeCrit4: number = 10;
  porcentajeCrit5: number = 5;
  porcentajeCrit6: number = 35;
  porcentajeCrit7: number = 35;
  porcentajePilar1: number = 30;
  porcentajePilar2: number = 35;
  porcentajePilar3: number = 35;
  porcentaje:number = 100

  bloquearBoton1: boolean = false
  bloquearBoton2: boolean = false
  bloquearBoton3: boolean = false
  bloquearBoton4: boolean = false
  bloquearBoton5: boolean = false
  bloquearBoton6: boolean = false
  bloquearBoton7: boolean = false



  datosGestor!: User[];
  datosEvaluador!: User[];
  editar: boolean = false
  visualizar: boolean = false
  gestorSeleccionado!: string
  evaluadorSeleccionado!: string
  datosFormulario!: MensajeRetornoBackEnd;

  // inyeccion de depedencias de FormReactive y servicios del backend
  constructor(private fb: FormBuilder, private formService: FormularioService, private userService: UserService){
    this.porcentaje;
  }
  // Se inicializa la muestra de datos
  ngOnInit(): void {
    this.obtenerGestor()
    this.obtenerEvaluador()
    this.obtenerEvaluadorUnico()
    this.obtenerGestorUnico()
    this.manejoRoles()


  }

  // Declaracion de los criterios del formulario y sus respectivas validaciones
  public formMatriz: FormGroup = this.fb.group({
    fechaInteraccion: ['', [ Validators.required, Validators.minLength(4)] ],
    nombre: ['', [ Validators.required, ] ],
    idInteraccion: ['', [ Validators.required] ],
    numeroContacto: ['', [ Validators.required] ],
    evaluador: ['', [Validators.required]],
    observaciones: [''],
    item1:  ['1', [Validators.required]],
    item2:  ['1', [Validators.required]],
    item3:  ['1', [Validators.required]],
    item4:  ['1', [Validators.required]],
    item5:  ['1', [Validators.required]],
    item6:  ['1', [Validators.required]],
    item7:  ['1', [Validators.required]],
    item8:  ['1', [Validators.required]],
    item9:  ['1', [Validators.required]],
    item10: ['1', [Validators.required]],
    item11: ['1', [Validators.required]],
    item12: ['1', [Validators.required]],
    item13: ['1', [Validators.required]],
    item14: ['1', [Validators.required]],
    item15: ['1', [Validators.required]],
    item16: ['1', [Validators.required]],
    item17: ['1', [Validators.required]],
    item18: ['1', [Validators.required]],
    item19: ['1', [Validators.required]],
    item20: ['1', [Validators.required]],
    item21: ['1', [Validators.required]],
    item22: ['1', [Validators.required]],
    item23: ['1', [Validators.required]],
    item24: ['1', [Validators.required]],
    item25: ['1', [Validators.required]],
    item26: ['1', [Validators.required]],
    item27: ['1', [Validators.required]],
    item28: ['1', [Validators.required]],
    item29: ['1', [Validators.required]],
    item30: ['1', [Validators.required]],
    item31: ['1', [Validators.required]],
    item32: ['1', [Validators.required]],
    item33: ['1', [Validators.required]],
    item34: ['1', [Validators.required]],
    item35: ['1', [Validators.required]],
    item36: ['1', [Validators.required]],
    item37: ['1', [Validators.required]],
    item38: ['1', [Validators.required]],
    item39: ['1', [Validators.required]],
    item40: ['1', [Validators.required]],
  })


  //Validacion de campo valido o no
  campoValido(campo: string): boolean | null {
    return this.formMatriz.controls[campo].errors &&
    this.formMatriz.controls[campo].touched

  }
  //Obtener el tipo de validacion en base al error acumulado
 obtenerTipoValidacion(campo: string) :string | null{
  if ( !this.formMatriz.controls[campo] ) return null;
  
    const errors = this.formMatriz.controls[campo].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;

 }

  enviarForm():void {
    //Declaracion de variables para el almacenamiento del formulario y la nota final
    const formulario: Formulario = this.formMatriz.value
    const notaFinal: number = this.notaTotal
    const datosFormulario: EnvioFormulario = {formulario, notaFinal}

    console.log(formulario)

    //Llamado al servicio para que se desemboque la funcionalidad del back
    this.formService.postEnviarFormulario(datosFormulario).subscribe(
      (res: any) => {
        this.datosFormulario = res

        Swal.fire({
          // Alerta de exito
          icon: 'success',
          title: 'Formulario enviado correctamente',
          text: res.message
        })

        setTimeout(() => {
          console.log('Al parecer aqui no funciona')
          window.location.reload()
        }, 2000)
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          Swal.fire({
            //Alerta de error
            icon: 'error',
            title: 'Oops...',
            text: error.error
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: error.error
          })
        }
      }
    )
    this.formMatriz.reset()
  }


  //Llamado del metodo para obtener el gestor y mostrarlo en el desplegable
  obtenerGestor(): void {
    this.userService.getInformacionGestor().subscribe(res => {
      this.datosGestor = res
    })
  }

  //Llamado al metodo para obtener el evaluador y mostrarlo en el desplegable
  obtenerEvaluador() :void{
    this.userService.getInformacionEvaluador().subscribe(res => {
      this.datosEvaluador = res

    })
  }
  //Lectura del gestor en base al localstorage
  obtenerGestorUnico() :void{
    const gestor = this.userService.leerUsuario()
    this.gestorSeleccionado = gestor.message[0].Usuario

  }
  //Lectura del evaluador en base al usuario que posee en el localstorage
  obtenerEvaluadorUnico() :void{
    const evaluador = this.userService.leerUsuario()
    this.evaluadorSeleccionado = evaluador.message[0].Usuario
  }

  //Logica para el manejo de roles y la muestra  y ocultacion de la informacion importante
  manejoRoles() :void{
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

  //Restar porcentaje en base al criterio
  restarPorcentaje(criterio: number) :void{

    switch (criterio) {
      case 1:
         this.bloquearBoton1 = true
         this.porcentajePilar1 -= 5;
         this.porcentajeCrit1 -= 5;
         this.notaTotal -= 5;
      break;

      case 2:
        this.bloquearBoton2 = true
        this.porcentajeCrit2 -= 5;
        this.porcentajePilar1 -= 5;
        this.notaTotal -= 5;
      break;

      case 3:
        this.bloquearBoton3 = true
        this.porcentajeCrit3 -= 5;
        this.porcentajePilar1 -= 5;
        this.notaTotal -= 5;
      break;

      case 4:
        this.bloquearBoton4 = true
        this.porcentajeCrit4 -= 10;
        this.porcentajePilar1 -= 10;
        this.notaTotal -= 10;
      break;

      case 5:
        this.bloquearBoton5 = true
        this.porcentajeCrit5 -= 5;
        this.porcentajePilar1 -= 5;
        this.notaTotal -= 5;
      break;

      case 6:
        this.bloquearBoton6 = true
        this.porcentajeCrit6 -= 35;
        this.porcentajePilar2 -= 35;
        this.notaTotal -= 35;
      break;

      case 7:
        this.bloquearBoton7 = true
        this.porcentajeCrit7 -= 35;
        this.porcentajePilar3 -= 35;
        this.notaTotal -= 35;
      break;


    }
  }



  sumarPorcentaje(criterio: number) : void{

    switch (criterio) {
      case 1:
         this.bloquearBoton1 = false
         this.porcentajePilar1 += 5;
         this.porcentajeCrit1 += 5;
         this.notaTotal += 5;
      break;

      case 2:
        this.bloquearBoton2 = false
        this.porcentajePilar1 += 5;
        this.porcentajeCrit2 += 5;
        this.notaTotal += 5;
      break;

      case 3:
        this.bloquearBoton3 = false
        this.porcentajePilar1 += 5;
        this.porcentajeCrit3 += 5;
        this.notaTotal += 5;
      break;

      case 4:
        this.bloquearBoton4 = false
        this.porcentajePilar1 += 10;
        this.porcentajeCrit4 += 10;
        this.notaTotal += 10;
      break;

      case 5:
        this.bloquearBoton5 = false
        this.porcentajePilar1 += 5;
        this.porcentajeCrit5 += 5;
        this.notaTotal += 5;
      break;

      case 6:
        this.bloquearBoton6 = false
        this.porcentajePilar2 += 35;
        this.porcentajeCrit6 += 35;
        this.notaTotal += 35;
      break;

      case 7:
        this.bloquearBoton7 = false
        this.porcentajePilar3 += 35;
        this.porcentajeCrit7 += 35;
        this.notaTotal += 35;
      break;
    }
  }
}
