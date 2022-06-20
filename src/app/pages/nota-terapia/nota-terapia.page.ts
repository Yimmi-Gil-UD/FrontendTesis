import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  notaTerapia:NotaTerapia;
  pacientes: PacienteDTO[] = [];
  enfermeras: EnfermeraDTO[] = [];
  tipoTerapiaDTOS: TipoTerapiaDTO[] = [];


  constructor(
    private terapiaService:TerapiaService,
    private router: Router,
    private toastController:ToastController,
    private firestore: FirebaseService,
    private pacienteService:PacienteService,
    private restlogin: RestLoginService,
    private enfermeraService:EnfermeraService,

  ) { }

  ngOnInit() {
    this.idEnfermera = this.restlogin.getId();
    console.log("id enfermera: ",this.idEnfermera);
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
    toast
    .present();
  }


  regresar()
  {
    let TIME_IN_MS = 2400;
    let hideFooterTimeout = setTimeout( () => {
    this.router.navigate(['nota-terapia']);
}, TIME_IN_MS);
  }

  buscar()
  {
    this.idPaciente = null;
    this.buscarPaciente(this.docPacienteBuscar);
    let TIME_IN_MS = 1000;
    let hideFooterTimeout = setTimeout( () => {

      if(this.idPaciente == null)
      {
        this.presentToast("no existe el paciente");
      }

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
        //console.log(this.pacientes);
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


  



}
