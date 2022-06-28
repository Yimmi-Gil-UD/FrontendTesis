import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Enfermera } from 'src/app/models/enfermera';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  generos: GeneroDTO[] = [];
  tipoDocumentos: TipoDocumentoDTO[] = [];
  enfermera:Enfermera;

  idUsuarioCorreo = "";
  idUsuarioDocumento = "";
  nombre = "";
  apellido = "";
  correo = "";
  password = "";
  identificacion = null;
  genero = "";
  tipoDocumento = '';
  rol = 'Gu2ZrrJHSBpmz5gIQnPH';
  estadoEnfermera = 'OY3rHoXKun6Y2MFr61JN';

  constructor(
    private enfermeraService:EnfermeraService,
    private router: Router,
    private toastController:ToastController,
    private firestore:FirebaseService
  ) { }

  ngOnInit() {
    this.cargarListaGenero();
    this.cargarListaDocumentos();
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

  limpiarCampos()
  {

  }

}
