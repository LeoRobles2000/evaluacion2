import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'login',
    templateUrl: '../views/recuperar.component.html'
})

export class RecuperarComponent implements OnInit {

    SESSION: any = {};
    username: string = "";
    passActual: string = "";
    passNuevo: string = "";

    constructor( private appService: AppService, private router: Router ) { 
        this.SESSION = JSON.parse(localStorage.getItem('SESSION') || '{}');
        if(Object.keys(this.SESSION).length !== 0 && this.SESSION.tipoUsuario == 1){
            alert("Favor de cerrar sesión");
            this.router.navigate(["/admin"]);
        }
        else if(Object.keys(this.SESSION).length !== 0 && this.SESSION.tipoUsuario == 2){
            alert("Favor de cerrar sesión");
            this.router.navigate(["/empleado"]);
        }
    }

    ngOnInit() { }

    login(){
    }

    updatePassword(){
        this.appService.getUsuario(this.username, this.passActual)
        .subscribe(json =>{
          if(json.respuesta){

            //Si las credenciales del usuario son correctas hace el update
            this.appService.updatePassword(this.username, this.passNuevo)
            .subscribe(json =>{
              if(json.respuesta){
                alert("Contraseña actualizada con exito");
                this.limpiarCampos();
                this.router.navigate(["/login"]);
              }
              else {
                alert("No se pudo actualizar la contraseña");
                this.limpiarCampos();
              }
            }, (err) => {
              alert("ERROR al llamar el servicio");
              this.limpiarCampos();
            });

          }
          else {
            alert("Credenciales incorrectas");
            this.limpiarCampos();
          }
        }, (err) => {
          alert("ERROR al llamar el servicio");
          this.limpiarCampos();
        });
    } //updatePassword

    limpiarCampos(){
        this.username   = "";
        this.passActual = "";
        this.passNuevo  = "";
    }

}