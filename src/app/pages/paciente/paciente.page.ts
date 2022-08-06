import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { ToastController } from '@ionic/angular';
import { CategoriaDiscapacidadDTO } from 'src/app/models/categoriaDiscapacidadDTO';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { GrupoSanguineoDTO } from 'src/app/models/grupoSanguineoDTO';
import { LogRegistro } from 'src/app/models/logRegistro';
import { Paciente } from 'src/app/models/paciente';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LogService } from 'src/app/services/log.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RestLoginService } from 'src/app/services/rest-login.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {


  idUsuarioDocumento = "";
  paciente:Paciente;
  nombrePaciente = '';
  apellidoPaciente = '';
  numeroIdentificacion = null;
  idTipoDoc = '';
  fechaNacimiento = null;
  direccion = '';
  telefono = null;
  idGenero = '';
  idDiscapacidad = '';
  idGrupo = '';
  idEstado = 'OY3rHoXKun6Y2MFr61JN';

  mensajeExito = '';
  mensajeError = '';
  texto:string;
  logRegistro:LogRegistro;

  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];
  discapacidades: CategoriaDiscapacidadDTO[] = [];
  grupoSanguineo: GrupoSanguineoDTO[] = [];

  constructor(
    private pacienteService:PacienteService,
    private router: Router,
    private toastController:ToastController,
    private firestore:FirebaseService,
    private speechRecognition:SpeechRecognition,
    private cd:ChangeDetectorRef,
    private logService:LogService,
    private restlogin: RestLoginService
  ) { 
    this.speechRecognition.requestPermission();
  }

  ngOnInit() {
    this.cargarListaDocumentos();
    this.cargarListaGenero();
    this.cargarListaDiscapacidad();
    this.cargarGrupoSanguineo();
    
  }

  crear()
  {

    this.idUsuarioDocumento = null;
    this.getValidacionDocumento(this.numeroIdentificacion);
    this.idEstado = 'OY3rHoXKun6Y2MFr61JN';
    let TIME_IN_MS = 2500;
    let hideFooterTimeout = setTimeout( () => {

    //console.log("usuarioDocumento retardo: ",this.idUsuarioDocumento);

    if(this.idUsuarioDocumento == null)
    {
    this.paciente = new Paciente(this.nombrePaciente,this.apellidoPaciente,this.numeroIdentificacion,this.idTipoDoc,this.fechaNacimiento,this.direccion,this.telefono,this.idGenero,this.idDiscapacidad,this.idGrupo,this.idEstado);
    this.guardarLog(this.paciente);
    this.pacienteService.crear(this.paciente).subscribe(
      data => {
        this.presentToast("paciente creado");
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

    }else {
      this.presentToast("ya existe el documento");
    }


  }, TIME_IN_MS);


  }

  guardarLog(paciente:Paciente)
  {
    this.logRegistro = new LogRegistro(this.restlogin.getId(),"Guardar Paciente",JSON.stringify(paciente),null,"");
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

  getValidacionDocumento(documentoUser:number) 
  {
    const path = 'Paciente/';
    this.firestore.GetUsuariosPE(path,'numeroIdentificacionP',documentoUser).then(firebaseResponse =>{
      firebaseResponse.subscribe(listaEnfermera =>{
        listaEnfermera.map(enfermeraRef =>{
        this.idUsuarioDocumento = enfermeraRef.payload.doc.id;
        })
        return this.idUsuarioDocumento;
      })
    })
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
    this.router.navigate(['/admin-pacientes']);
}, TIME_IN_MS);
  }

  cargarListaDocumentos(): void {
    this.pacienteService.listaDocumentos().subscribe(
      data => {
        this.tipoDocumentos = data;
        //console.log(this.tipoDocumentos);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarListaGenero(): void {
    this.pacienteService.listaGenero().subscribe(
      data => {
        this.generos = data;
        //console.log(this.generos);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarListaDiscapacidad(): void {
    this.pacienteService.listaCategoriaDiscapacidad().subscribe(
      data => {
        this.discapacidades = data;
        //console.log(this.discapacidades);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarGrupoSanguineo(): void {
    this.pacienteService.listaGrupoSanguineo().subscribe(
      data => {
        this.grupoSanguineo = data;
        //console.log(this.grupoSanguineo);
      },
      err => {
        console.log(err);
      }
    );
  }

  limpiarCampos()
  {
      this.nombrePaciente = '';
      this.apellidoPaciente = '';
      this.numeroIdentificacion = null;
      this.idTipoDoc = '';
      this.fechaNacimiento = null;
      this.direccion = '';
      this.telefono = null;
      this.idGenero = '';
      this.idDiscapacidad = '';
      this.idGrupo = '';
  }

  async nombresListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.nombrePaciente = this.nombrePaciente + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async apellidosListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.apellidoPaciente = this.apellidoPaciente + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async numIdentificacionListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.numeroIdentificacion = Number(this.texto.replace(/ /g, ""));
      this.cd.detectChanges();
    });
    
  }

  async direccionListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.direccion = this.direccion + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }


  async telefonoListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.telefono = Number(this.texto.replace(/ /g, ""));
      this.cd.detectChanges();
    });
    
  }

}
