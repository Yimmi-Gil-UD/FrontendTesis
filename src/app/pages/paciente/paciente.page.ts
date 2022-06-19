import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaDiscapacidadDTO } from 'src/app/models/categoriaDiscapacidadDTO';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { GrupoSanguineoDTO } from 'src/app/models/grupoSanguineoDTO';
import { Paciente } from 'src/app/models/Paciente';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

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

  mensajeExito = '';
  mensajeError = '';

  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];
  discapacidades: CategoriaDiscapacidadDTO[] = [];
  grupoSanguineo: GrupoSanguineoDTO[] = [];

  constructor(
    private pacienteService:PacienteService,
    private router: Router,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.cargarListaDocumentos();
    this.cargarListaGenero();
    this.cargarListaDiscapacidad();
    this.cargarGrupoSanguineo();
    
  }

  crear()
  {
    this.paciente = new Paciente(this.nombrePaciente,this.apellidoPaciente,this.numeroIdentificacion,this.idTipoDoc,this.fechaNacimiento,this.direccion,this.telefono,this.idGenero,this.idDiscapacidad,this.idGrupo);
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
