import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contrarTres().then(
      mensaje => console.log('terminó!', mensaje)
    )
    .catch( error => console.error('error en la promesa', error));

   }




  ngOnInit(): void {
  }

  contrarTres() {

    return new Promise( (resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if ( contador === 3 ) {
          // reject('simplemente un error');
          resolve('ok!');
          clearInterval(intervalo);
        }
      }, 1000 );

    });
  }

}
