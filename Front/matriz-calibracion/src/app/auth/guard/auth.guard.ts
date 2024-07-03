
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //Inyeccion de dependencias del router y del servicio de usuario
  constructor( private Router: Router, private userService: UserService ) {}

  //Guard de can activate (Si el usuario esta loggeado)
  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;

    } else
      this.Router.navigate(['./matrizCalibracion/Login']);
      return false;
    }
}

@Injectable({
  providedIn: 'root'
})
//Guardia de si el usuario es administrador o no
export class AdminGuard implements CanActivate {
  //Inyeccion de dependencias y del servicio de usuario
  constructor( private Router: Router, private userService: UserService ) {}

    //Si el usuario es admin dejar pasar, si no devolver a estadisticas
  canActivate(): boolean {
    if (this.userService.isAdmin()) {
      return true;
    } else
      this.Router.navigate(['./matrizCalibracion/Estadisticas']);
      return false;
    }
}



