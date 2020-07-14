import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;

  auth2: any;

  constructor( public router: Router,
               public usuarioService: UsuarioService,
               public ngZone: NgZone  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }


  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '413610589988-vd0ec6q26ddf95mktru5of6o09s65i5o.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'

      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }



  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle( token )
          .subscribe( () => this.ngZone.run(() => this.router.navigate(['/dashboard'])) );


    });

  }


  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe( correcto => this.router.navigate(['/dashboard'])  );

  }



}
