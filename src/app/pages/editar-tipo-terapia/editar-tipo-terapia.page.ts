import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TipoTerapia } from 'src/app/models/tipoTerapia';
import { TipoTerapiaDTO } from 'src/app/models/tipoTerapiaDTO';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-editar-tipo-terapia',
  templateUrl: './editar-tipo-terapia.page.html',
  styleUrls: ['./editar-tipo-terapia.page.scss'],
})
export class EditarTipoTerapiaPage implements OnInit {

  terapiasDTO: TipoTerapiaDTO[]=[];
  tipoTerapia: TipoTerapia;

  constructor(
    private terapiaService:TerapiaService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.cargarDatosPaciente();
  }

  cargarDatosPaciente():void{
    const id = this.activateRoute.snapshot.params.id;
    this.terapiaService.detalleTipoTerapia(id).subscribe(
      data => {

        this.terapiasDTO = data;
        
        //console.log(this.pacientesDTO);
               
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
       this.tipoTerapia = new TipoTerapia (this.terapiasDTO[i].nombreTerapia.toString());
       //console.log("Datos de la fecha ",this.pacientesDTO[i].fechaNacimiento);
    }
    
    this.terapiaService.actualizarTerapia(id,this.tipoTerapia).subscribe(
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
    this.router.navigate(['/terapias']);
}, TIME_IN_MS);
  }

  limpiarCampos()
  {
    this.tipoTerapia.nombreTerapia = '';
  }

}
