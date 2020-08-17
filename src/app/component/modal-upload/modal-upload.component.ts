import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  

  imagenSubir: File;
  imagenTemp: any = null;

  constructor( public subirArchivoService: SubirArchivoService,
               public modalUploadService: ModalUploadService  ) { }

  ngOnInit(): void {
  }


  subirImagen() {

    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
        .then( resp => {

          this.modalUploadService.notificacion.emit( resp );
          this.cerrarModal();

        })
        .catch( err => {
          console.log('error en la carga... ');
        })

  }


  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this.modalUploadService.ocultarModal();
  }


  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {

      Swal.fire({
        icon: 'error',
        title: 'Solo imagenes',
        text: 'El archivo seleccionado no es una imagen'
      });
      this.imagenSubir = null;

    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }




}
