import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xyz';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen no existe, usuarios, medicos, hospitales');
        url += '/usuarios/xyz';
        break;
    }


    return url;
  }

}
