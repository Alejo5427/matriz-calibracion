import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CrearUsuario, MensajeRetornoBackEnd } from 'src/app/matriz-calibracion/interfaces/forms';


@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  //Declaracion de variables
  visualizar: boolean = false
  editar: boolean = false
  hide = true
  creacionUsuario!: MensajeRetornoBackEnd;

  //Inyeccion de dependencias
  constructor(private fb: FormBuilder,
              private UserService: UserService,
              private router: Router) {
  }
  //Inicializacion del metodo de logica de roles
  ngOnInit(): void  {
    this.manejoRoles()
  }




  //Formulario de campos para la creacion de usuario
  public formCrearUsuario: FormGroup = this.fb.group({
    Usuario: ['', [Validators.required]],
    Contrasena: ['', [Validators.required]],
    Cedula: ['', [Validators.required]],
    Rol: ['', [Validators.required]]
  })


  //Metodo que invoca la creacion de usuarios
  crearUsuario () {
    const datos: CrearUsuario = this.formCrearUsuario.value
    //Llamada al servicio para efectuarse en el backend
    this.UserService.postCrearUsuario(datos).subscribe(
      (respuesta) => {
        this.creacionUsuario = respuesta
        console.log(this.creacionUsuario)
        //Alerta de si salio bien o no
        Swal.fire({
          icon: 'success',
          title: 'Usuario Creado!',
          text: respuesta.message,
        })

        setTimeout(() => {
          console.log('Al parecer aqui no funcion')
          window.location.reload()
        }, 2000)
      },
      (error) => {
        // Alerta de si algo salio mal
        if (error instanceof HttpErrorResponse) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.error
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
    this.formCrearUsuario.reset()
  }

  //Funcion de cierre de sesion
  cerrarSesion () {
    localStorage.clear()
    this.router.navigate(['./matrizCalibracion/Login'])
  }

  //Logica de manejo de roles
  manejoRoles () {
    const rol = this.UserService.leerUsuario()
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
