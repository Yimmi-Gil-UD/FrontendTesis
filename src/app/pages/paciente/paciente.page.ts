import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaDiscapacidadDTO } from 'src/app/models/categoriaDiscapacidadDTO';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { GrupoSanguineoDTO } from 'src/app/models/grupoSanguineoDTO';
import { Paciente } from 'src/app/models/paciente';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PacienteService } from 'src/app/services/paciente.service';

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

  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];
  discapacidades: CategoriaDiscapacidadDTO[] = [];
  grupoSanguineo: GrupoSanguineoDTO[] = [];

  constructor(
    private pacienteService:PacienteService,
    private router: Router,
    private toastController:ToastController,
    private firestore:FirebaseService
  ) { }

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

    let TIME_IN_MS = 2500;
    let hideFooterTimeout = setTimeout( () => {

    //console.log("usuarioDocumento retardo: ",this.idUsuarioDocumento);

    if(this.idUsuarioDocumento == null)
    {
    this.paciente = new Paciente(this.nombrePaciente,this.apellidoPaciente,this.numeroIdentificacion,this.idTipoDoc,this.fechaNacimiento,this.direccion,this.telefono,this.idGenero,this.idDiscapacidad,this.idGrupo,this.idEstado);
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

}
