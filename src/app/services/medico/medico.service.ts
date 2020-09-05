import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( public http: HttpClient,
               public router: Router,
               public usuarioService: UsuarioService,
               public subirArchivoService: SubirArchivoService ) { }



  cargarMedicos( desde: number = 0  ) {

    const url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get( url );

    }


  buscarMedico( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url ).pipe(
      map( (resp: any) =>  resp.medicos ) );

    }



  borrarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete( url ).pipe(
      map( (resp: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Médico borrado',
          text: 'El medico ha sido eliminado correctamente'
        });

      }));

  }



  guardarMedico( medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id  ) {

      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, medico).pipe(
        map( (resp: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Médico actualizado',
            text: 'El medico ha sido actualizado correctamente'
          });
          return resp.medico;

        }));

    } else {

      // creando
      url += '?token=' + this.usuarioService.token;

      return this.http.post( url, medico ).pipe(
      map( (resp: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Médico creado',
          text: 'El medico ha sido creado correctamente'
        });
        return resp.medico;

      }));

    }

    

  }


  cargarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url ).pipe(
      map( (resp: any) => resp.medico));

    }


}
