import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate, CanLoad {

  constructor( public usuarioService: UsuarioService,
               public router: Router  ) {}
  canLoad(route: Route, segments: import('@angular/router').UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {

    if ( this.usuarioService.estaLogueado() ) {

      return true;
    } else {
      console.log('BLOQEUADO POR EL GUARD');
      this.router.navigate(['/login']);
    }

  }

  canActivate() {

    if ( this.usuarioService.estaLogueado() ) {

      return true;
    } else {
      console.log('BLOQEUADO POR EL GUARD');
      this.router.navigate(['/login']);
    }

  }
}
