import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaDiscapacidadDTO } from 'src/app/models/categoriaDiscapacidadDTO';
import { EstadoDTO } from 'src/app/models/estadoDTO';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { GrupoSanguineoDTO } from 'src/app/models/grupoSanguineoDTO';
import { Paciente } from 'src/app/models/paciente';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.page.html',
  styleUrls: ['./editar-paciente.page.scss'],
})
export class EditarPacientePage implements OnInit {

  paciente:Paciente;
  pacientesDTO:PacienteDTO[] = [];
  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];
  categoriaDiscapacidad:CategoriaDiscapacidadDTO[] = [];
  grupoSanguineo:GrupoSanguineoDTO[] = [];
  estados:EstadoDTO[] = [];


  constructor(
    private pacienteService:PacienteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.cargarDatosPaciente();
    this.cargarListaDocumentos();
    this.cargarListaGenero();
    this.cargarGrupo();
    this.cargarTipoDiscapacidad();
    this.cargarEstadoPaciente();
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

  cargarTipoDiscapacidad(): void {
    this.pacienteService.listaCategoriaDiscapacidad().subscribe(
      data => {
        this.categoriaDiscapacidad = data;
        //console.log(this.generos);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarGrupo(): void {
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

  cargarDatosPaciente():void{
    const id = this.activateRoute.snapshot.params.id;
    this.pacienteService.detalle(id).subscribe(
      data => {

        this.pacientesDTO = data;
        
        //console.log(this.pacientesDTO);
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

  cargarEstadoPaciente():void{
    const id = this.activateRoute.snapshot.params.id;
    this.pacienteService.listaEstado().subscribe(
      data => {

        this.estados = data;
        
        //console.log(this.estados);
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

  actualizarPaciente():void
  {
    const id = this.activateRoute.snapshot.params.id;
    for(let i in this.pacientesDTO)
    {
       this.paciente = new Paciente (this.pacientesDTO[i].nombrePaciente.toString(),this.pacientesDTO[i].apellidoPaciente.toString(),this.pacientesDTO[i].numeroIdentificacionP,this.pacientesDTO[i].idTipoDocumentoP.toString(),this.pacientesDTO[i].fechaNacimiento,this.pacientesDTO[i].direccion.toString(),this.pacientesDTO[i].telefono,this.pacientesDTO[i].idGenero.toString(),this.pacientesDTO[i].idCategoriaDiscapacidad.toString(),this.pacientesDTO[i].idGrupoSanguineo.toString(),this.pacientesDTO[i].idEstadoPaciente.toString());
       //console.log("Datos de la fecha ",this.pacientesDTO[i].fechaNacimiento);
    }
    
    this.pacienteService.actualizar(id,this.paciente).subscribe(
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


  limpiarCampos(){
    this.paciente.nombrePaciente = '';
    this.paciente.apellidoPaciente = '';
    this.paciente.numeroIdentificacionP = null;
    this.paciente.idTipoDocumentoP = '';
    this.paciente.fechaNacimiento = null;
    this.paciente.direccion = '';
    this.paciente.telefono = null;
    this.paciente.idGenero = '';
    this.paciente.idCategoriaDiscapacidad = '';
    this.paciente.idGrupoSanguineo = '';
  }

}
