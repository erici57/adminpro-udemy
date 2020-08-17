import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('modal service lsito');
   }


   mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
   }


   ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
   }

}
