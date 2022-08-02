import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Enfermera } from 'src/app/models/enfermera';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { EstadoDTO } from 'src/app/models/estadoDTO';
import { GeneroDTO } from 'src/app/models/generoDTO';
import { LogRegistro } from 'src/app/models/logRegistro';
import { RolDTO } from 'src/app/models/rolDTO';
import { TipoDocumentoDTO } from 'src/app/models/TipoDocumentoIdDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';
import { LogService } from 'src/app/services/log.service';
import { RestLoginService } from 'src/app/services/rest-login.service';

@Component({
  selector: 'app-editar-enfermera',
  templateUrl: './editar-enfermera.page.html',
  styleUrls: ['./editar-enfermera.page.scss'],
})
export class EditarEnfermeraPage implements OnInit {

  enfermera:Enfermera; //= new Enfermera('','','',null,'','','','');
  enfermeraDTOs: EnfermeraDTO[] = [];
  tipoDocumentos: TipoDocumentoDTO[] = [];
  generos: GeneroDTO[] = [];
  estados:EstadoDTO[] = [];
  roles:RolDTO[] = [];

  showPassword = false;
  passwordToggleIcon = 'eye';
  logRegistro:LogRegistro;


  
  constructor(
    private enfermeraService:EnfermeraService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastController:ToastController,
    private logService:LogService,
    private restlogin: RestLoginService
  ) { }

  ngOnInit() {
    this.cargarDatosEnfermera();
    this.cargarListaDocumentos();
    this.cargarListaGenero();
    this.cargarEstado();
    this.cargarRol();
  }

  cargarDatosEnfermera():void{
    const id = this.activateRoute.snapshot.params.id;
    this.enfermeraService.detalle(id).subscribe(
      data => {

        this.enfermeraDTOs = data;
        
        //console.log(this.enfermeraDTOs);
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

  actualizarEnfermera():void
  {
    const id = this.activateRoute.snapshot.params.id;
    for(let i in this.enfermeraDTOs)
    {
       this.enfermera = new Enfermera (this.enfermeraDTOs[i].nombre.toString(),this.enfermeraDTOs[i].apellido.toString(),this.enfermeraDTOs[i].idTipoDocumentoE.toString(),this.enfermeraDTOs[i].numeroIdentificacion,this.enfermeraDTOs[i].correo.toString(),this.enfermeraDTOs[i].password.toString(),this.enfermeraDTOs[i].idGenero.toString(),this.enfermeraDTOs[i].idRol.toString(),this.enfermeraDTOs[i].idEstadoEnfermera.toString());
       //console.log("Datos de la enfermera ",this.enfermera);
    }
    this.guardarLog(this.enfermera);
    this.enfermeraService.actualizar(id,this.enfermera).subscribe(
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

  guardarLog(enfermera:Enfermera)
  {
    this.logRegistro = new LogRegistro(this.restlogin.getId(),"Editar Enfermera",JSON.stringify(enfermera),null,"");
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

  cargarEstado(): void {
    this.enfermeraService.listaEstado().subscribe(
      data => {
        this.estados = data;
        //console.log(this.estados);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarRol(): void {
    this.enfermeraService.listaRol().subscribe(
      data => {
        this.roles = data;
        //console.log(this.roles);
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
    this.router.navigate(['/admin-enfermeras']);
}, TIME_IN_MS);
  }

  limpiarCampos(){
    this.enfermera.nombre = '';
    this.enfermera.apellido = '';
    this.enfermera.idTipoDocumentoE = '';
    this.enfermera.numeroIdentificacion = null;
    this.enfermera.correo = '';
    this.enfermera.password = '';
    this.enfermera.idGenero = '';
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


}
