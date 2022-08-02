import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { ToastController } from '@ionic/angular';
import { Enfermera } from 'src/app/models/enfermera';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { LogRegistro } from 'src/app/models/logRegistro';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LogService } from 'src/app/services/log.service';
import { RestLoginService } from 'src/app/services/rest-login.service';

@Component({
  selector: 'app-adicionar-enfermera',
  templateUrl: './adicionar-enfermera.page.html',
  styleUrls: ['./adicionar-enfermera.page.scss'],
})
export class AdicionarEnfermeraPage implements OnInit {

  enfermera:Enfermera;
  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];


  idUsuarioCorreo = "";
  idUsuarioDocumento = "";
  nombre = '';
  apellido = '';
  tipoDocumento = '';
  identificacion = null;
  correo = '';
  password = '';
  genero = '';
  // rol de user quemado XD
  rol = 'Gu2ZrrJHSBpmz5gIQnPH';
  estadoEnfermera = 'OY3rHoXKun6Y2MFr61JN';

  showPassword = false;
  passwordToggleIcon = 'eye';
  texto:string;
  logRegistro:LogRegistro;

  
  constructor(
    private enfermeraService:EnfermeraService,
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
  }

  crear()
  {

    this.idUsuarioCorreo = null;
    this.idUsuarioDocumento = null;
    this.getValidacionCorreo(this.correo);
    this.getValidacionDocumento(this.identificacion);



    let TIME_IN_MS = 2500;
    let hideFooterTimeout = setTimeout( () => {
    //console.log("usuarioCorreo retardo: ",this.idUsuarioCorreo);
    //console.log("usuarioDocumento retardo: ",this.idUsuarioDocumento);

    if(this.idUsuarioCorreo == null && this.idUsuarioDocumento == null)
    {
      this.enfermera = new Enfermera(this.nombre,this.apellido,this.tipoDocumento,this.identificacion,this.correo,this.password,this.genero,this.rol,this.estadoEnfermera);
      this.guardarLog(this.enfermera);
      this.enfermeraService.crear(this.enfermera).subscribe(
        data => {
          this.presentToast("enfermera cread(@)");
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
    else {
      this.presentToast("ya existe el correo o el documento");
    }

    }, TIME_IN_MS);
    

  }

  guardarLog(enfermera:Enfermera)
  {
    this.logRegistro = new LogRegistro(this.restlogin.getId(),"Guardar Enfermera",JSON.stringify(enfermera),null,"");
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



  getValidacionCorreo(correoUser:string) 
  {
    const path = 'Enfermera/';
    this.firestore.GetAllUser(path,'correo',correoUser).then(firebaseResponse =>{
      firebaseResponse.subscribe(listaEnfermera =>{
        listaEnfermera.map(enfermeraRef =>{
        this.idUsuarioCorreo = enfermeraRef.payload.doc.id;
        })
        return this.idUsuarioCorreo;
      })
    })
  }

  getValidacionDocumento(documentoUser:number) 
  {
    const path = 'Enfermera/';
    this.firestore.GetUsuariosPE(path,'numeroIdentificacion',documentoUser).then(firebaseResponse =>{
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
    this.router.navigate(['/admin-enfermeras']);
}, TIME_IN_MS);
  }

  cargarListaDocumentos(): void {
    this.enfermeraService.listaDocumentos().subscribe(
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
    this.enfermeraService.listaGenero().subscribe(
      data => {
        this.generos = data;
        //console.log(this.generos);
      },
      err => {
        console.log(err);
      }
    );
  }

  limpiarCampos(){
    this.nombre = '';
    this.apellido = '';
    this.tipoDocumento = '';
    this.identificacion = null;
    this.correo = '';
    this.password = '';
    this.genero = '';
    this.rol = '';
  }
  
  verContrasena():void
  {
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye')
    {
      this.passwordToggleIcon = 'eye-off';
    }
    else{
      this.passwordToggleIcon = 'eye';
    }
  }

  async nombreListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.nombre = this.nombre + " " + this.texto;
      this.cd.detectChanges();
    });
    
  }

  async apellidoListening()
  {
    this.texto='';
    let options = {
      language: 'es-ES',
      matches: 1,
      partialResults:true
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.texto = matches[0];
      this.apellido = this.apellido + " " + this.texto;
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
      this.identificacion = Number(this.texto.replace(/ /g, ""));
      this.cd.detectChanges();
    });
    
  }



}
