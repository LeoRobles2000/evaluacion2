import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { trigger, transition, state, animate, style, keyframes } from '@angular/animations';

@Component({
    selector: 'homeAdmin',
    templateUrl: '../views/homeAdmin.component.html',
    animations: [
        trigger('slideStatus', [
          state('inactivo', style({ backgroundColor: 'white' })),
          state('activo', style({ backgroundColor: 'orange' })),
    
          transition('* => activo', [
            animate('2s', keyframes([
              style({ backgroundColor: 'blue', offset: 0}),
              style({ backgroundColor: 'red', offset: 0.8}),
              style({ backgroundColor: 'orange', offset: 1.0})
            ])),
          ]),
          transition('* => inactivo', [
            animate('2s', keyframes([
              style({ backgroundColor: 'white', offset: 0}),
              style({ backgroundColor: 'white', offset: 0.2}),
              style({ backgroundColor: 'white', offset: 1.0})
            ]))
          ]),
        ])
      ]
})

export class HomeAdminComponent implements OnInit {

    SESSION: any = {};
    heroes: any[] = [];
    status: any[] = [];
    ultimoSeleccionado: number = 0;
    

    constructor( private appService: AppService, private router: Router ) { 
        this.SESSION = JSON.parse(localStorage.getItem('SESSION') || '{}');
        if(Object.keys(this.SESSION).length === 0){
            this.router.navigate(["../"]);
          }
        if(this.SESSION.tipoUsuario == 2){
            alert("Acceso denegado");
            this.router.navigate(["/empleado"]);
        }
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    async getHeroes() {
        this.appService.getHeroes()
        .subscribe(json =>{
            this.heroes = json.getHeroes;
        }, (err) => {
          console.log("ERROR al llamar el servicio");
        });
    }

    logout(){
        setTimeout(()=>{
            this.SESSION = {};
            localStorage.clear();
            this.router.navigate(["../"]);
        }, 1000);
    }

    resaltarElemento(index: number) {
        this.status[index] = this.status[index]  === 'activo' ? 'inactivo' : 'activo';
        this.status[this.ultimoSeleccionado] = this.status[this.ultimoSeleccionado]  === 'inactivo';
        this.ultimoSeleccionado = index;
      }


      
}