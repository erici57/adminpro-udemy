import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/component/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde = 0;
  cargando = true;
  totalRegistros = 0;

  constructor( public hospitalService: HospitalService,
               public modalUsuarioService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.modalUsuarioService.notificacion
        .subscribe( resp => this.cargarHospitales() );
  }


  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
          .subscribe( (resp: any) => {

            console.log(resp);
            this.totalRegistros = resp.total;
            this.hospitales = resp.hospitales;
            this.cargando = false;

          });

  }



  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }



  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital( termino )
        .subscribe( (hospitales: Hospital[]) => {

          this.hospitales = hospitales;
          this.cargando = false;

        });

  }



  borrarHospital( hospital: Hospital ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar'
    }).then( borrar => {

        if ( borrar.value ) {

          this.hospitalService.borrarHospital( hospital._id )
                .subscribe( borrado => {
                  console.log(borrado);
                  this.cargarHospitales();
                });

      }
    });


  }


  guardarHospital( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital ).subscribe();

  }



  mostrarModal( id: string) {

    this.modalUsuarioService.mostrarModal( 'hospitales', id );

  }



  crearHospital() {

    Swal.fire({
      icon: 'info',
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

    }).then( ( valor: any ) => {

      if ( !valor.value || valor.value.lenght === 0 ) {
        return; // no hace nada
      }

      this.hospitalService.crearHospital( valor.value )
          .subscribe( () => this.cargarHospitales() );

    });

  }

}
