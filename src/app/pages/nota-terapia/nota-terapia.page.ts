import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CategoriaDiscapacidadDTO } from 'src/app/models/categoriaDiscapacidadDTO';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { NotaTerapia } from 'src/app/models/notaTerapia';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { TipoTerapiaDTO } from 'src/app/models/tipoTerapiaDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RestLoginService } from 'src/app/services/rest-login.service';
import { TerapiaService } from 'src/app/services/terapia.service';
import { ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

@Component({
  selector: 'app-nota-terapia',
  templateUrl: './nota-terapia.page.html',
  styleUrls: ['./nota-terapia.page.scss'],
})
export class NotaTerapiaPage implements OnInit {

  docPacienteBuscar = null;
  idPaciente = '';
  objetivo = '';
  estrucCorporal = '';
  funcCorporal = '';
  pronostico = '';
  planTrabajo = '';
  fechaTerapia = null;
  horaTerapia = '';
  observacion = '';
  idTipoTerapia = '';
  idEnfermera = '';
  isActivo:boolean;
  validar:boolean;

  notaTerapia:NotaTerapia;
  pacientes: PacienteDTO[] = [];
  pacienteEstado: PacienteDTO[] = [];
  enfermeras: EnfermeraDTO[] = [];
  tipoTerapiaDTOS: TipoTerapiaDTO[] = [];

  texto:string;
  textoFinal = "";
  isRecording = false;
  estadoPaciente = "";


  constructor(
    private terapiaService:TerapiaService,
    private router: Router,
    private toastController:ToastController,
    private firestore: FirebaseService,
    private pacienteService:PacienteService,
    private restlogin: RestLoginService,
    private enfermeraService:EnfermeraService,
    private speechRecognition:SpeechRecognition,
    private cd:ChangeDetectorRef,
    private navCtrl: NavController,
    private alertController:AlertController,

  ) {
    this.speechRecognition.requestPermission();
   }

  ngOnInit() {
    this.idEnfermera = this.restlogin.getId();
    //console.log("id enfermera: ",this.idEnfermera);
    this.cargarEnfermera(this.idEnfermera);
    this.cargarListaCategoria();
  }

  crear()
  {
    this.notaTerapia = new NotaTerapia(this.idPaciente,this.objetivo,this.estrucCorporal,this.funcCorporal,this.pronostico,this.planTrabajo,this.fechaTerapia,this.horaTerapia,this.observacion,this.idTipoTerapia,this.idEnfermera);
    this.terapiaService.crear(this.notaTerapia).subscribe(
      data => {
        this.presentToast("nota creada");
        let TIME_IN_MS = 2500;
        let hideFooterTimeout = setTimeout( () => {
        this.limpiarCampos();

        }, TIME_IN_MS);
        
        this.regresar();
      },
      err => {
        this.presentToast("error al crear la nota");
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


  regresar()
  {
    let TIME_IN_MS = 2400;
    let hideFooterTimeout = setTimeout( () => {
    this.router.navigate(['user-terapia']);
}, TIME_IN_MS);
  }

  buscar()
  {
    this.idPaciente = null;
    this.isActivo = false;
    this.validar = false;
    this.estadoPaciente = "";
    this.buscarPaciente(this.docPacienteBuscar);
    let TIME_IN_MS = 2000;
    let hideFooterTimeout = setTimeout( () => {

      if(this.estadoPaciente == 'Inactivo')
      {
         this.isActivo = false;
         this.presentToast("El paciente no se encuentra activo");
      }
      else if(this.estadoPaciente == 'Activo'){  
         this.isActivo = true;
         this.validar = true;
      }
      if(this.idPaciente == null)
      {
          this.presentToast("No existe el paciente");
      }

      //console.log(this.idPaciente);
      //console.log("Estado Paciente: ",this.isActivo);  

}, TIME_IN_MS);
    
    this.pacientes = null;
  }

  buscarPaciente(numDocumento:number) 
  {
    const path = 'Paciente/';
    this.firestore.GetUsuariosPE(path,'numeroIdentificacionP',numDocumento).then(firebaseResponse =>{
      
      firebaseResponse.subscribe(listaPaciente =>{
        listaPaciente.map(pacienteRef =>{
        this.idPaciente = pacienteRef.payload.doc.id;
        this.cargarPaciente(this.idPaciente);
        //console.log("idPaciente: ",this.idPaciente);
        })
        return this.idPaciente;
      })
    })
  }


  cargarPaciente(id:string): void {
    this.pacienteService.detalle(id).subscribe(
      data => {
        this.pacientes = data;
        this.estadoPaciente = this.pacientes[0].descripcionEstadoPaciente;
        //console.log("Info del paciente: ",this.pacientes);
        //console.log("Info del estado: ",this.estadoPaciente);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarEnfermera(id:string): void {
    this.enfermeraService.detalle(id).subscribe(
      data => {
        this.enfermeras = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  limpiarCampos()
  {
    this.idPaciente = '';
    this.objetivo = '';
    this.estrucCorporal = '';
    this.funcCorporal = '';
    this.pronostico = '';
    this.planTrabajo = '';
    this.fechaTerapia = null;
    this.horaTerapia = '';
    this.observacion = '';
    this.idTipoTerapia = '';
    this.docPacienteBuscar = '';
    this.pacientes = null;
  }

  cargarListaCategoria(): void {
    this.terapiaService.listaTipoTerapia().subscribe(
      data => {
        this.tipoTerapiaDTOS = data;
        //console.log(this.generos);
      },
      err => {
        console.log(err);
      }
    );
  }

  async startListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.observacion = this.observacion + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async docPacienteListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.docPacienteBuscar = Number(this.texto.replace(/ /g, ""));
      this.cd.detectChanges();
    });
    
  }

  async objetivoListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.objetivo = this.objetivo + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async estrucCorporalListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.estrucCorporal = this.estrucCorporal + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async funcionCorporalListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.funcCorporal = this.funcCorporal + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async pronosticolListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.pronostico = this.pronostico + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async planTrabajoListening()
  {
    this.texto = '';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.planTrabajo = this.planTrabajo + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }
  
  stopListening()
  {
    //this.speechRecognition.stopListening().then(() => {
    //this.isRecording = false;
    //})
    this.isRecording = false;
    this.speechRecognition.stopListening();

  }

  async guardarConfirm(){
    const alert = await this.alertController.create({
      header: 'Guardar Nota',
      message: '¿Seguro de guardar la nota de terapia? Recuerde que no puede editar la nota, para editar la nota debe solicitarlo con el administrador.',
      buttons:[
        {
          text:'Aceptar',
          handler: () =>{
            this.crear();
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


}
