import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { NotaEnfermeria } from 'src/app/models/notaEnfermeria';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NotaService } from 'src/app/services/nota.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RestLoginService } from 'src/app/services/rest-login.service';
import { ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';




@Component({
  selector: 'app-nuevo-nota',
  templateUrl: './nuevo-nota.page.html',
  styleUrls: ['./nuevo-nota.page.scss'],
})
export class NuevoNotaPage implements OnInit {


  myvar: string;
  docPacienteBuscar = null;
  idPaciente = '';
  numCuarto = null;
  numCama = null;
  fechaNota = null;
  horaNota = null;
  observacion = '';
  tensionSistolicoNota = null;
  tensionDiastolicoNota = null;
  tension = '';
  frecuenciaCardiacaNota = null;
  frecuenciaRespiratoriaNota = null;
  temperaturaNota = null;
  saturacionNota = null;
  glucometriaNota = null;
  idEnfermera = '';
  isActivo:boolean;
  validar:boolean;

  notaEnfermeria:NotaEnfermeria;
  pacientes: PacienteDTO[] = [];
  enfermeras: EnfermeraDTO[] = [];

  texto:string;
  textoFinal = "";
  isRecording = false;


  constructor(
    private notaService:NotaService,
    private router: Router,
    private toastController:ToastController,
    private firestore: FirebaseService,
    private pacienteService:PacienteService,
    private restlogin: RestLoginService,
    private enfermeraService:EnfermeraService,
    private speechRecognition:SpeechRecognition,
    private cd:ChangeDetectorRef,
    private navCtrl: NavController
    ) { 
      this.speechRecognition.requestPermission();
    }

  ngOnInit() {

    this.idEnfermera = this.restlogin.getId();
    //console.log("id enfermera: ",this.idEnfermera);
    this.myMethod();
    this.cargarEnfermera(this.idEnfermera);
  }

  crear()
  {
    this.tension = this.tensionSistolicoNota + "/"+ this.tensionDiastolicoNota;
    this.notaEnfermeria = new NotaEnfermeria(this.idPaciente,this.numCuarto,this.numCama,this.fechaNota,this.horaNota,this.observacion,this.tensionSistolicoNota,this.tensionDiastolicoNota,this.tension,this.frecuenciaCardiacaNota,this.frecuenciaRespiratoriaNota,this.temperaturaNota,this.saturacionNota,this.glucometriaNota,this.idEnfermera);
    this.notaService.crear(this.notaEnfermeria).subscribe(
      data => {
        this.presentToast("nota creada");
        let TIME_IN_MS = 2500;
        let hideFooterTimeout = setTimeout( () => {
        this.limpiarCampos();

        }, TIME_IN_MS);
        
        this.regresar();
      },
      err => {
        this.presentToast("error al crear el paciente");
      }
    );
    
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


  regresar()
  {
    let TIME_IN_MS = 2400;
    let hideFooterTimeout = setTimeout( () => {
    this.router.navigate(['/user']);
}, TIME_IN_MS);
  }

  limpiarCampos()
  {
  
    this.numCuarto = '';
    this.numCama = '';
    this.fechaNota = '';
    this.horaNota = '';
    this.observacion = '';
    this.tensionSistolicoNota = '';
    this.tensionDiastolicoNota = '';
    this.tension = '';
    this.frecuenciaCardiacaNota = '';
    this.frecuenciaRespiratoriaNota = '';
    this.temperaturaNota = '';
    this.saturacionNota = '';
    this.glucometriaNota = '';
    this.idPaciente = '';
    this.docPacienteBuscar = '';
    this.pacientes = null;

    



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

  buscar()
  {
    this.idPaciente = null;
    this.isActivo = false;
    this.validar = false;
    this.buscarPaciente(this.docPacienteBuscar);
    let TIME_IN_MS = 2000;
    let hideFooterTimeout = setTimeout( () => {

      for(let p in this.pacientes)
      {             
        //console.log(this.pacientes);
          if(this.pacientes[p].descripcionEstadoPaciente == 'Inactivo')
          {
            this.isActivo = false;
          }
          else{  
            this.isActivo = true;
          }
          
      }


      if(this.idPaciente == null)
      {
        this.presentToast("No existe el paciente");
      }
      else if(this.isActivo == false)
      {
        this.presentToast("El paciente no se encuentra activo");
      }
      else{
          this.validar = true;
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
  
  stopListening()
  {

    this.isRecording = false;
    this.speechRecognition.stopListening();

  }
 

}
