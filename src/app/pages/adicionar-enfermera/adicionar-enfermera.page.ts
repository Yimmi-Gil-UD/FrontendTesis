import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Enfermera } from 'src/app/models/enfermera';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';

@Component({
  selector: 'app-adicionar-enfermera',
  templateUrl: './adicionar-enfermera.page.html',
  styleUrls: ['./adicionar-enfermera.page.scss'],
})
export class AdicionarEnfermeraPage implements OnInit {

  enfermera:Enfermera;
  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];


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

  
  constructor(
    private enfermeraService:EnfermeraService,
    private router: Router,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.cargarListaDocumentos();
    this.cargarListaGenero();
  }

  crear()
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

}
