import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LogRegistro } from 'src/app/models/logRegistro';
import { TipoTerapiaDTO } from 'src/app/models/tipoTerapiaDTO';
import { LogService } from 'src/app/services/log.service';
import { RestLoginService } from 'src/app/services/rest-login.service';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-terapias',
  templateUrl: './terapias.page.html',
  styleUrls: ['./terapias.page.scss'],
})
export class TerapiasPage implements OnInit {

  terapias:TipoTerapiaDTO [] = [];
  textoBuscar = '';
  logRegistro:LogRegistro;

  constructor(
    private terapiaService:TerapiaService,
    private toastController:ToastController,
    private alertController:AlertController,
    private navCtrl: NavController,
    private logService:LogService,
    private restlogin: RestLoginService
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

  async borrarConfirm(id:string){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Seguro de eliminar la terapia?',
      buttons:[
        {
          text:'Aceptar',
          handler: () =>{
            this.EliminarTipoTerapia(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler:(blah) => {
            console.log('confirm cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  irACrear(){
    this.navCtrl.navigateForward('/adicionar-tipo-terapia');
  }

  EliminarTipoTerapia(id:string):void
  {
    this.guardarLog(id);
    this.terapiaService.EliminarTipoTerapia(id).subscribe(
      data => {
        this.presentToast("Terapia eliminada");
        this.cargarLista();
      },
      err =>{
        this.presentToast("Error al eliminar la terapia");
      }
    );
  }

  
  guardarLog(id:string)
  {
    this.logRegistro = new LogRegistro(this.restlogin.getId(),"Eliminar Tipo Terapia",JSON.stringify(id),null,"");
    //console.log("Datos guardados en log: ",this.logRegistro);

    this.logService.crear(this.logRegistro).subscribe(
      data => {
        //this.presentToast("Datos actualizados"); 
        let TIME_IN_MS = 2500;
        let hideFooterTimeout = setTimeout( () => {
        //this.limpiarCampos();
        }, TIME_IN_MS);
        
        //this.regresar();
      },
      err => {
        console.log("error al guardar el log eliminar tipo Terapia");
      }
    );

  }


}
