import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-nuevo-nota',
  templateUrl: './nuevo-nota.page.html',
  styleUrls: ['./nuevo-nota.page.scss'],
})
export class NuevoNotaPage implements OnInit {


  myvar: string;
  tensionSistolicoNota : number;
  tensionDiastolicoNota : number;
  tension : string;
  frecuenciaCardiacaNota : number;
  frecuenciaRespiratoriaNota : number;
  temperaturaNota : number;
  saturacionNota : number;
  glucometriaNota : number;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    this.myMethod();
  }

  vaciar(){

  }

  onCreate()
  {
    
  }

  myMethod() {
    if (this.myvar) {
      this.tensionSistolicoNota = null;
      this.tensionDiastolicoNota = null;
      this.frecuenciaCardiacaNota = null;
      this.frecuenciaRespiratoriaNota = null;
      this.temperaturaNota = null;
      this.saturacionNota = null;
      this.glucometriaNota = null;

    } else {
      this.tensionSistolicoNota = 0;
      this.tensionDiastolicoNota = 0;
      this.frecuenciaCardiacaNota = 0;
      this.frecuenciaRespiratoriaNota = 0;
      this.temperaturaNota = 0;
      this.saturacionNota = 0;
      this.glucometriaNota = 0;
    } 
  }


 

}
