import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Enfermera } from 'src/app/models/enfermera';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { NotaEnfermeria } from 'src/app/models/notaEnfermeria';
import { NotaEnfermeriaDTO } from 'src/app/models/notaEnfermeriaDTO';
import { Paciente } from 'src/app/models/paciente';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { NotaService } from 'src/app/services/nota.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.page.html',
  styleUrls: ['./editar-nota.page.scss'],
})
export class EditarNotaPage implements OnInit {

  myvar: string;
  tensionSistolicoNota : number;
  tensionDiastolicoNota : number;
  tension : string;
  frecuenciaCardiacaNota : number;
  frecuenciaRespiratoriaNota : number;
  temperaturaNota : number;
  saturacionNota : number;
  glucometriaNota : number;

  paciente:Paciente;
  pacienteDTO:PacienteDTO[] = [];
  notaEnfermeria:NotaEnfermeria;
  notaEnfermeriaDTO:NotaEnfermeriaDTO[] = [];
  enfermera:Enfermera;
  enfermeraDTO:EnfermeraDTO[] = [];

  constructor(
    private pacienteService:PacienteService,
    private enfermeraService:EnfermeraService,
    private notaService:NotaService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastController:ToastController,
  ) { }

  ngOnInit() {
    this.cargarDatosTerapia();
  }

  cargarDatosTerapia()
  {
    const id = this.activateRoute.snapshot.params.id;
    this.notaService.detalle(id).subscribe(
      data => {
        this.notaEnfermeriaDTO = data;
        //console.log(this.terapiasDTO);
        for(let i in this.notaEnfermeriaDTO)
        {
          this.cargarDatosPaciente(this.notaEnfermeriaDTO[i].idPaciente.toString());
          this.cargarDatosEnfermera(this.notaEnfermeriaDTO[i].idEnfermera.toString());
          //this.paciente = new Paciente (this.pacientesDTO[i].nombrePaciente.toString(),this.pacientesDTO[i].apellidoPaciente.toString(),this.pacientesDTO[i].numeroIdentificacionP,this.pacientesDTO[i].idTipoDocumentoP.toString(),this.pacientesDTO[i].fechaNacimiento,this.pacientesDTO[i].direccion.toString(),this.pacientesDTO[i].telefono,this.pacientesDTO[i].idGenero.toString(),this.pacientesDTO[i].idCategoriaDiscapacidad.toString(),this.pacientesDTO[i].idGrupoSanguineo.toString());
          //console.log("Datos de la fecha ",this.pacientesDTO[i].fechaNacimiento);
        }
      

      },
      err => {
        console.log(err);
      }
    );
  }

  cargarDatosPaciente(id:string)
  {
    this.pacienteService.detalle(id).subscribe(
      data => {

        this.pacienteDTO = data;
        //console.log(id);
        //console.log("Datos del paciente: ",this.pacienteDTO);
               
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
        //console.log(id);
        //console.log("Datos del paciente: ",this.pacientesDTO);
               
      },
      err => {
        //console.log("Error");
      }
    );
  }


  actualizarNotaTerapia():void
  {
    const id = this.activateRoute.snapshot.params.id;
    for(let i in this.notaEnfermeriaDTO)
    {
       this.notaEnfermeriaDTO[i].tensionArterial = this.notaEnfermeriaDTO[i].tensionArterialSistolico.toString() + "/"+ this.notaEnfermeriaDTO[i].tensionArterialDiastolico.toString();
       this.notaEnfermeria = new NotaEnfermeria (this.notaEnfermeriaDTO[i].idPaciente.toString(),this.notaEnfermeriaDTO[i].numeroCuarto,this.notaEnfermeriaDTO[i].numeroCama,this.notaEnfermeriaDTO[i].fechaNota,this.notaEnfermeriaDTO[i].horaNota.toString(),this.notaEnfermeriaDTO[i].observacion.toString(),this.notaEnfermeriaDTO[i].tensionArterialSistolico,this.notaEnfermeriaDTO[i].tensionArterialDiastolico,this.notaEnfermeriaDTO[i].tensionArterial.toString(),this.notaEnfermeriaDTO[i].frecuenciaCardiaca,this.notaEnfermeriaDTO[i].frecuenciaRespiratoria,this.notaEnfermeriaDTO[i].temperatura,this.notaEnfermeriaDTO[i].saturacion,this.notaEnfermeriaDTO[i].glucometria,this.notaEnfermeriaDTO[i].idEnfermera.toString());
       //console.log("Datos de la fecha ",this.pacientesDTO[i].fechaNacimiento);
    }
    
    this.notaService.actualizar(id,this.notaEnfermeria).subscribe(
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
    this.router.navigate(['/admin']);
}, TIME_IN_MS);
  }

  myMethod() {
    console.log(">>>>: " + this.myvar);
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

  limpiarCampos()
  {
    this.notaEnfermeria.idPaciente = '';
    this.notaEnfermeria.numeroCuarto = null;
    this.notaEnfermeria.numeroCama = null;
    this.notaEnfermeria.fechaNota = null;
    this.notaEnfermeria.horaNota = '';
    this.notaEnfermeria.observacion = '';
    this.notaEnfermeria.tensionArterialSistolico = null;
    this.notaEnfermeria.tensionArterialDiastolico = null;
    this.notaEnfermeria.tensionArterial = '';
    this.notaEnfermeria.frecuenciaCardiaca = null;
    this.notaEnfermeria.frecuenciaRespiratoria = null;
    this.notaEnfermeria.temperatura = null;
    this.notaEnfermeria.saturacion = null;
    this.notaEnfermeria.glucometria = null;
    this.notaEnfermeria.idEnfermera = '';
  }


}
