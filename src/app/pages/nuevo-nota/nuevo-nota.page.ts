import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-nuevo-nota',
  templateUrl: './nuevo-nota.page.html',
  styleUrls: ['./nuevo-nota.page.scss'],
})
export class NuevoNotaPage implements OnInit {

  valorTemperatura: number;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  vaciar(){

  }

  onCreate()
  {
    
  }




 

}
