import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'login',
    templateUrl: '../views/login.component.html'
})

export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";
    SESSION: any = {};

    constructor( private appService: AppService, private router: Router ) {
      this.SESSION = JSON.parse(localStorage.getItem('SESSION') || '{}');
     }

    ngOnInit() { }

    login(){
        this.appService.getUsuario(this.username, this.password)
        .subscribe(json =>{
          if(json.respuesta){
            localStorage.setItem("SESSION",JSON.stringify(json.getUsuario[0]));
            alert("Bienvenido "+json.getUsuario[0].nombre);
            if(json.getUsuario[0].idUsuario == 1){
              this.router.navigate(["/admin"]);
            }else{
              this.router.navigate(["/empleado"]);
            }
          }
          else {
            alert("Credenciales incorrectas");
            this.limpiarCampos();
          }
        }, (err) => {
          alert("ERROR al llamar el servicio");
          this.limpiarCampos();
        });
    } //login

    limpiarCampos(){
      this.username = "";
      this.password = "";
  }

}