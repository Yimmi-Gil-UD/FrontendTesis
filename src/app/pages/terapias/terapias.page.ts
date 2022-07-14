import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TipoTerapiaDTO } from 'src/app/models/tipoTerapiaDTO';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-terapias',
  templateUrl: './terapias.page.html',
  styleUrls: ['./terapias.page.scss'],
})
export class TerapiasPage implements OnInit {

  terapias:TipoTerapiaDTO [] = [];
  textoBuscar = '';

  constructor(
    private terapiaService:TerapiaService,
    private toastController:ToastController,
    private alertController:AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.cargarLista();
  }

  cargarLista(): void {
    this.terapiaService.listaTipoTerapia().subscribe(
      data => {
        this.terapias = data;
        //console.log(this.terapias);
      },
      err => {
        console.log(err);
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

  irACrear(){
    this.navCtrl.navigateForward('/adicionar-tipo-terapia');
  }


}
