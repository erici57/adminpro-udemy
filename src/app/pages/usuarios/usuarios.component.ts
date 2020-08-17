import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  cargando = true;
  totalRegistros = 0;

  constructor( private usuarioService: UsuarioService,
               public modalUsuarioService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsurios();

    this.modalUsuarioService.notificacion
        .subscribe( resp => this.cargarUsurios() );
  }

  cargarUsurios() {

    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
          .subscribe( (resp: any) => {

            console.log(resp);
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
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
    this.cargarUsurios();
  }



  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsurios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuarios( termino )
        .subscribe( (usuarios: Usuario[]) => {

          console.log(usuarios);
          this.usuarios = usuarios;
          this.cargando = false;

        });

  }



  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this.usuarioService.usuario._id ) {

      Swal.fire({
        icon: 'error',
        title: 'No se puede borrar usuario',
        text: 'No se puede borrar a si mismo'
      });

      return;
    }


    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar'
    }).then( borrar => {

        if ( borrar.value ) {

          this.usuarioService.borrarUsuario( usuario._id )
                .subscribe( borrado => {
                  console.log(borrado);
                  this.cargarUsurios();
                });

      }
    });


  }


  guardarUsuario( usuario: Usuario ) {

    this.usuarioService.actualizarUsuario( usuario ).subscribe();

  }



  mostrarModal( id: string) {

    this.modalUsuarioService.mostrarModal( 'usuarios', id );

  }



}
