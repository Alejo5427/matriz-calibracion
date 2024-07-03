import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { EditarUsuario, InfoTablaUsuariosAjustes, MensajeRetornoBackEnd } from '../interfaces/forms';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent {
  // Declaracion de variables
  informacionUsuario!: InfoTablaUsuariosAjustes[];
  informacionUsuarioInhabilitado!: InfoTablaUsuariosAjustes[];
  datosActualizar!: MensajeRetornoBackEnd;
  id: number;
  columnasUsuarios: string[] = ['Posicion','Nombre', 'Rol', 'Editar', 'Estado'];
  // Inyeccion de depedencias del FormBuilder y el service de login
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.id = 0
  }

  ngOnInit(): void {
    this.obtenerDatosUsuariosHabilitados()
    this.obtenerDatosUsuariosInhabilitados()
  }


  //Creacion de campos del formulario de edicion de usuarios
  public formEditarUsuario: FormGroup = this.fb.group({
    UsuarioEdit: [''],
    ContrasenaEdit: [''],
    CedulaEdit: [''],
    RolEdit: ['']

  })
  //Campos de formulario para la eliminacion de usuarios
  public formEstadoUsuario: FormGroup =  this.fb.group({
    estado: ['', [Validators.required]]
  })





  obtenerDatosUsuariosHabilitados() {
    this.userService.getUsuariosHabilitados().subscribe(res => {
      this.informacionUsuario = res
    })
  }

 obtenerDatosUsuariosInhabilitados() {
  this.userService.getUsuariosInhabilitados().subscribe( res => {
    this.informacionUsuarioInhabilitado = res
  })
 }



  obtenerID(idLlegado: number) {
    this.id = idLlegado

  }



  //Metodo de edicion de usuarios
  editarUsuario() {
    //Declaracion de variable donde se almacenara el formulario con sus respectivos datos
    const datosActualizar: EditarUsuario = this.formEditarUsuario.value
    this.id


    this.userService.putEditarUsuario(datosActualizar, this.id).subscribe(
      (res) => {
        //Alerta de exito
        this.datosActualizar = res
        console.log(this.datosActualizar);

        Swal.fire({
          icon: 'success',
          title: 'Usuario Editado exitosamente',
          text: res.message,
        })

        setTimeout(() => {
          console.log('Al parecer aqui no funciona')
          window.location.reload()
        }, 2000)
      },
      (error) => {
        //Alerta de error
        if (error instanceof HttpErrorResponse) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.error,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.error,
          });
        }
      }
    )
    this.formEditarUsuario.reset()
  }





  //Metodo de cambio de estado de usuario
  cambioEstadoUsuario() {
    //Declaracion de variable de almacenamiento de formulario
    const datosEstado: string = this.formEstadoUsuario.value
    const localStorageinfo = this.userService.leerUsuario()
    const idUser = localStorageinfo.message[0].id




    //Llamada del servicio post para eliminar usuarios al backend
    this.userService.postEstadoUsuario(datosEstado,  this.id).subscribe(
      (res) => {
        if (this.id === idUser) {

            localStorage.clear()
            setTimeout(() => {
              window.location.reload()
            }, 2000);
        } else {
          setTimeout(() => {
            window.location.reload()
          }, 1500);
        }
        //Alerta de exito
        Swal.fire({
          icon: 'success',
          title: 'Estado Usuario',
          text: 'Cambio de estado efectuado exitosamente'
        })

      },
      (error) => {
        Swal.fire({
          //Alerta de fallo
          icon: 'error',
          title: 'Oops...',
          text: error.error.error
        })
      }
    )
    this.formEstadoUsuario.reset()
  }








}




