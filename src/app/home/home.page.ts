import { Component, OnInit } from '@angular/core';
import { RestLoginService } from '../services/rest-login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  ingreso = false;
  nombre = "";

  constructor( private restlogin: RestLoginService) {}

  ionViewWillEnter(){
    this.validarLogin();
  }
 
  validarLogin(): void
  {
    this.ingreso = this.restlogin.getId() != null;
    this.nombre = this.restlogin.getCorreo();
  }

}
