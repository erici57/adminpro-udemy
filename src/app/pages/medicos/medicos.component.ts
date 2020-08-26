import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { ModalUploadService } from 'src/app/component/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde = 0;
  cargando = true;
  totalRegistros = 0;

  constructor( public medicoService: MedicoService,
               public modalUsuarioService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }


  cargarMedicos() {

    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
          .subscribe( (resp: any) => {

            console.log(resp);
            this.totalRegistros = resp.total;
            this.medicos = resp.medicos;
            this.cargando = false;

          });

  }



  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedico( termino )
        .subscribe( (medicos: Medico[]) => {

          this.medicos = medicos;
          this.cargando = false;

        });

  }




  borrarMedico( medico: Medico ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar'
    }).then( borrar => {

        if ( borrar.value ) {

          this.medicoService.borrarMedico( medico._id )
                .subscribe( borrado => {
                  console.log(borrado);
                  this.cargarMedicos();
                });

      }
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
    this.cargarMedicos();
  }


}
