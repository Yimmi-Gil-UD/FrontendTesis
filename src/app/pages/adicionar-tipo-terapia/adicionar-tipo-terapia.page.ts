import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { LogRegistro } from 'src/app/models/logRegistro';
import { TipoTerapia } from 'src/app/models/tipoTerapia';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LogService } from 'src/app/services/log.service';
import { RestLoginService } from 'src/app/services/rest-login.service';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-adicionar-tipo-terapia',
  templateUrl: './adicionar-tipo-terapia.page.html',
  styleUrls: ['./adicionar-tipo-terapia.page.scss'],
})
export class AdicionarTipoTerapiaPage implements OnInit {

  validar:boolean;
  nombreTipoTerapia = '';
  tipoTerapia:TipoTerapia;
  idTipoTerapia = '';
  logRegistro:LogRegistro;

  constructor(
    private terapiaService:TerapiaService,
    private router: Router,
    private toastController:ToastController,
    private firestore: FirebaseService,
    private logService:LogService,
    private restlogin: RestLoginService
  ) { }

  ngOnInit() {
  }

  crear()
  {
    this.idTipoTerapia = null;
    this.getValidacionTerapia(this.nombreTipoTerapia);
    //console.log(this.nombreTipoTerapia);

    let TIME_IN_MS = 2500;
    let hideFooterTimeout = setTimeout( () => {

      if(this.idTipoTerapia == null) {
        this.tipoTerapia = new TipoTerapia(this.nombreTipoTerapia,);
        this.guardarLog(this.tipoTerapia);
        this.terapiaService.crearTipoTerapia(this.tipoTerapia).subscribe(
          data => {
            this.presentToast("terapia creada");
            let TIME_IN_MS = 2500;
            let hideFooterTimeout = setTimeout( () => {
            this.limpiarCampos();
    
            }, TIME_IN_MS);
            
            this.regresar();
          },
          err => {
            this.presentToast("error al crear tipo terapia");
          }
        );
      }
      else {
        this.presentToast("ya existe el tipo de terapia");
      }
   
    }, TIME_IN_MS);
  }


  guardarLog(tipoTerapia:TipoTerapia)
  {
    this.logRegistro = new LogRegistro(this.restlogin.getId(),"Guardar Tipo Terapia",JSON.stringify(tipoTerapia),null,"");
    //console.log("Datos guardados en log: ",this.logRegistro);

    this.logService.crear(this.logRegistro).subscribe(
      data => {
        //this.presentToast("Datos actualizados"); 
        let TIME_IN_MS = 2500;
        let hideFooterTimeout = setTimeout( () => {
        this.limpiarCampos();
        }, TIME_IN_MS);
        
        this.regresar();
      },
      err => {
        console.log("error al guardar el log");
      }
    );

  }


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast
    .present();
  }

  limpiarCampos()
  {
    this.nombreTipoTerapia = '';
  }


  regresar()
  {
    let TIME_IN_MS = 2400;
    let hideFooterTimeout = setTimeout( () => {
    this.router.navigate(['/terapias']);
}, TIME_IN_MS);
  }

  getValidacionTerapia(nombreTerapia:string) 
  {
    const path = 'TipoTerapia/';
    this.firestore.GetAllUser(path,'nombreTerapia',nombreTerapia).then(firebaseResponse =>{
      firebaseResponse.subscribe(listaDatos =>{
        listaDatos.map(datosRef =>{
        this.idTipoTerapia = datosRef.payload.doc.id;
        })
        return this.idTipoTerapia;
      })
    })
  }


 

}
