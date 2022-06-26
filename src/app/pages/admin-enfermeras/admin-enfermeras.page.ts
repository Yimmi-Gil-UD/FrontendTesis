import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Enfermera } from 'src/app/models/enfermera';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';

@Component({
  selector: 'app-admin-enfermeras',
  templateUrl: './admin-enfermeras.page.html',
  styleUrls: ['./admin-enfermeras.page.scss'],
})
export class AdminEnfermerasPage implements OnInit {

  //enfermeras: string[] = ['carmen', 'Yenny', 'Alejandra', 'Gabriela'];
  enfermera:Enfermera;
  enfermeras: EnfermeraDTO[] = [];
  textoBuscar = '';
  rol = 'Gu2ZrrJHSBpmz5gIQnPH';
  estadoEnfermera = 'SEVN7ru20e7d5hGvo8or';

  constructor(
    private enfermeraService:EnfermeraService,
    private toastController:ToastController,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  // para que se muestre la actualizacion al instante
  ionViewWillEnter()
  {
    this.cargarLista();
  }

  cargarLista(): void {
    this.enfermeraService.lista().subscribe(
      data => {
        this.enfermeras = data;
        //console.log(this.enfermeras);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarDatosEnfermera(id:string):void{
    this.enfermeraService.detalle(id).subscribe(
      data => {

        this.enfermeras = data;
        
        //console.log(this.enfermeras);
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  

}
