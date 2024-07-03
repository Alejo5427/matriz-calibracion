import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, MensajeRetornoBackEnd } from '../interfaces/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Declaracion de variables
   datosLogin: any;
   hide = true;
  //Inyeccion de dependencias del servicio de formulario y del FormBuilder
  constructor(private fb: FormBuilder,
             private userService: UserService,
             private router: Router) {

  }

  //Creacion de los campos del formulario
  public formLogin: FormGroup  = this.fb.group({
    Usuario: ['', [Validators.required]],
    Contrasena: ['', [Validators.required]]
  })

  //Metodo de inicio de sesion
  inicioSesion() {
    //Declaracion de variable para el guardado de datos
    const datos: Login = this.formLogin.value

    //Llamada al servicio de postLogin para el ingreso al sistema
    this.userService.postLogin(datos).subscribe(
      (respuesta: any) => {
        this.datosLogin = respuesta
        console.log(this.datosLogin);


        Swal.fire({
          //Alerta exitosa
          icon: 'success',
          title: 'Ingreso Correcto!',
          text:'Verificacion exitosa',
        })
        //Se guarda los datos en el localstorage
        localStorage.setItem('Date', JSON.stringify( this.datosLogin ))
        //Redireccionamiento de lugar a Estadisticas
        this.router.navigateByUrl('/matrizCalibracion/Estadisticas');

      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          //Alerta de error
          this.formLogin.markAllAsTouched();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario / Contraseña Incorrectos',
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
  }
}

