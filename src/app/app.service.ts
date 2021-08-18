import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor( private http: HttpClient ) { }
  

  getUsuario(username:string, password:string): Observable<any> {

    let httpParams = new HttpParams()
                                    .set('username', username)
                                    .set('password', password);

    return this.http.post<any>(`/api/evaluacion2/login.php`, httpParams);

  } //getUsuario

  getHeroes(): Observable<any> {

    return this.http.get<any>(`/api/evaluacion2/getHeroes.php`);

  } //getHeroes

  getAnimes(): Observable<any> {

    return this.http.get<any>(`/api/evaluacion2/getAnimes.php`);

  } //getAnimes

  updatePassword(username:string, passNueva:string): Observable<any> {

    let httpParams = new HttpParams()
                                    .set('username', username)
                                    .set('passNuevo', passNueva);

    return this.http.post<any>(`/api/evaluacion2/updatePassword.php`, httpParams);

  } //getUsuario



}
