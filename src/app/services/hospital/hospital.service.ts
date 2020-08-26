import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public usuarioService: UsuarioService,
               public subirArchivoService: SubirArchivoService ) {


  }





  cargarHospitales( desde: number = 0  ) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );

  }



  obtenerHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url ).pipe(
      map( (resp: any) =>  resp.hospital ) );

  }



  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete( url ).pipe(
      map( (resp: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Hospital borrado',
          text: 'El hospital ha sido eliminado correctamente'
        });

      }));

  }



  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;

    return this.http.post( url, {nombre} ).pipe(
      map( (resp: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Hospital creado',
          text: nombre
        });

        return resp.hospital;

      })
    );

  }



  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url ).pipe(
      map( (resp: any) =>  resp.hospitales ) );

  }




  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put( url, hospital ).pipe(
      map( (resp: any) =>  {

        // if ( hospital._id === this.hospital._id ) {
        //  this.guardarStorage( resp.usuario._id, this.token, resp.usuario );
        // }

        Swal.fire({
          icon: 'success',
          title: 'Hospital actualizado',
          text: hospital.nombre
        });

        return resp.hospital;
      })
    );

  }



}
