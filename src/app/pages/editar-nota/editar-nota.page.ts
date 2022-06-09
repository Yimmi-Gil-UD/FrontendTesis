import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.page.html',
  styleUrls: ['./editar-nota.page.scss'],
})
export class EditarNotaPage implements OnInit {

  myvar: string;
  tensionSistolicoNota : number;
  tensionDiastolicoNota : number;
  tension : string;
  frecuenciaCardiacaNota : number;
  frecuenciaRespiratoriaNota : number;
  temperaturaNota : number;
  saturacionNota : number;
  glucometriaNota : number;

  constructor() { }

  ngOnInit() {
  }

  vaciar()
  {

  }

  onUpdate()
  {
    
  }

  myMethod() {
    console.log(">>>>: " + this.myvar);
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
