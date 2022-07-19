import { Injectable } from '@angular/core';

const idResult = 'idResult';
const correoResult = 'correoResult';
const rolResult = 'rolResult';

@Injectable({
  providedIn: 'root'
})
export class RestLoginService {

  // IP DEL SERVIDOR LOCAL 
  //ip = 'http://localhost';
  ip = 'http://192.168.20.38';

  constructor() { }

  public setId(id:string):void {
    window.sessionStorage.removeItem(idResult);
    window.sessionStorage.setItem(idResult,id);
  }

  public getId():string {
    return window.sessionStorage.getItem(idResult);
  }

  public setCorreo(correo:string):void {
    window.sessionStorage.removeItem(correoResult);
    window.sessionStorage.setItem(correoResult,correo);
  }

  public getCorreo():string {
    return window.sessionStorage.getItem(correoResult);
  }

  public setRol(rol:string):void {
    window.sessionStorage.removeItem(rolResult);
    window.sessionStorage.setItem(rolResult,rol);
  }

  public getRol():string {
    return window.sessionStorage.getItem(rolResult);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }

}
