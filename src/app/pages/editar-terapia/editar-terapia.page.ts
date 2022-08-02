import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { LogRegistro } from 'src/app/models/logRegistro';
import { NotaTerapia } from 'src/app/models/notaTerapia';
import { NotaTerapiaDTO } from 'src/app/models/notaTerapiaDTO';
import { Paciente } from 'src/app/models/paciente';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { TipoTerapiaDTO } from 'src/app/models/tipoTerapiaDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LogService } from 'src/app/services/log.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RestLoginService } from 'src/app/services/rest-login.service';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-editar-terapia',
  templateUrl: './editar-terapia.page.html',
  styleUrls: ['./editar-terapia.page.scss'],
})
export class EditarTerapiaPage implements OnInit {


  paciente:Paciente;
  terapia:NotaTerapia;
  pacientesDTO:PacienteDTO[] = [];  
  tipoTerapia:TipoTerapiaDTO[] = [];
  enfermeraDTO:EnfermeraDTO[] = [];
  terapiasDTO:NotaTerapiaDTO[] = [];
  logRegistro:LogRegistro;
  


  
  constructor(
    private terapiaService:TerapiaService,
    private pacienteService:PacienteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastController:ToastController,
    private enfermeraService:EnfermeraService,
    private logService:LogService,
    private restlogin: RestLoginService
    
  ) { }

  ngOnInit() {

    this.cargarDatosTipoTerapia();
    //this.cargarDatosPaciente();
    //this.cargarDatosEnfermera();
    this.cargarDatosTerapia();

  }

  cargarDatosTipoTerapia()
  {
    this.terapiaService.listaTipoTerapia().subscribe(
      data => {
        this.tipoTerapia = data;
        //console.log(this.tipoTerapia);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarDatosTerapia()
  {
    const id = this.activateRoute.snapshot.params.id;
    this.terapiaService.detalle(id).subscribe(
      data => {
        this.terapiasDTO = data;
        //console.log(this.terapiasDTO);
        for(let i in this.terapiasDTO)
        {
          this.cargarDatosPaciente(this.terapiasDTO[i].idPaciente.toString());
          this.cargarDatosEnfermera(this.terapiasDTO[i].idEnfermera.toString());
          //this.paciente = new Paciente (this.pacientesDTO[i].nombrePaciente.toString(),this.pacientesDTO[i].apellidoPaciente.toString(),this.pacientesDTO[i].numeroIdentificacionP,this.pacientesDTO[i].idTipoDocumentoP.toString(),this.pacientesDTO[i].fechaNacimiento,this.pacientesDTO[i].direccion.toString(),this.pacientesDTO[i].telefono,this.pacientesDTO[i].idGenero.toString(),this.pacientesDTO[i].idCategoriaDiscapacidad.toString(),this.pacientesDTO[i].idGrupoSanguineo.toString());
          //console.log("Datos de la fecha ",this.pacientesDTO[i].fechaNacimiento);
        }
      

      },
      err => {
        console.log(err);
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
    this.router.navigate(['/admin-terapia']);
}, TIME_IN_MS);
  }

  cargarDatosPaciente(id:string):void{

    this.pacienteService.detalle(id).subscribe(
      data => {

        this.pacientesDTO = data;
        //console.log(id);
        //console.log("Datos del paciente: ",this.pacientesDTO);
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

  cargarDatosEnfermera(id:string)
  {
    this.enfermeraService.detalle(id).subscribe(
      data => {

        this.enfermeraDTO = data;
        
        //console.log(this.enfermeraDTO);
               
      },
      err => {
        //console.log("Error");
      }
    );
  }


  actualizarTerapia():void
  {
    const id = this.activateRoute.snapshot.params.id;
    for(let i in this.terapiasDTO)
    {
       this.terapia = new NotaTerapia (this.terapiasDTO[i].idPaciente.toString(),this.terapiasDTO[i].objetivo.toString(),this.terapiasDTO[i].estructuraCorporal.toString(),this.terapiasDTO[i].funcionCorporal.toString(),this.terapiasDTO[i].pronostico.toString(),this.terapiasDTO[i].planTrabajo.toString(),this.terapiasDTO[i].fechaNotaTerapia,this.terapiasDTO[i].horaNotaTerapia.toString(),this.terapiasDTO[i].observacion.toString(),this.terapiasDTO[i].idTipoTerapia.toString(),this.terapiasDTO[i].idEnfermera.toString());
       //console.log("Datos de la fecha ",this.pacientesDTO[i].fechaNacimiento);
    }
    this.guardarLog(this.terapia);
    this.terapiaService.actualizar(id,this.terapia).subscribe(
      data => {
        this.presentToast("Datos actualizados");
        let TIME_IN_MS = 2500;
        let hideFooterTimeout = setTimeout( () => {
        this.limpiarCampos();
        }, TIME_IN_MS);
        
        this.regresar();
      },
      err => {
        this.presentToast("error al actualizar datos");
      }
    );
    
  }

  guardarLog(terapia:NotaTerapia)
  {
    this.logRegistro = new LogRegistro(this.restlogin.getId(),"Editar Nota Terapia",JSON.stringify(terapia),null,"");
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

  limpiarCampos()
  {
    this.terapia.idPaciente = '';
    this.terapia.objetivo = '';
    this.terapia.estructuraCorporal = '';
    this.terapia.funcionCorporal = '';
    this.terapia.pronostico = '';
    this.terapia.planTrabajo = '';
    this.terapia.fechaNotaTerapia = null;
    this.terapia.horaNotaTerapia = '';
    this.terapia.observacion = '';
    this.terapia.idTipoTerapia = '';
    this.terapia.idEnfermera = '';
  }



}
