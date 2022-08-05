import { Component, OnInit } from '@angular/core';
import { LogRegistroDTO } from 'src/app/models/logRegistroDTO';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-registros-log',
  templateUrl: './registros-log.page.html',
  styleUrls: ['./registros-log.page.scss'],
})
export class RegistrosLogPage implements OnInit {

  registros: LogRegistroDTO[] = [];
  //registros2:any[]=[];
  registros2: Array<string | string | string | JSON | string | string>=[];
  textoBuscar = '';
  itemBusqueda = '';
  

   

  constructor(
    private logService:LogService
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  ionViewWillEnter()
  {
    this.cargarLista();
  }

  cargarLista(): void {
    this.logService.lista().subscribe(
      data => {
        this.registros = data;
      },
      err => {
        console.log(err);
      }
    );

  }

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
    //console.log("seleccion: ",this.itemBusqueda);
    //console.log(JSON.parse("{\"idPaciente\":\"Qlou27r8lexNMt39e0Dl\",\"objetivo\":\"hombros\",\"estructuraCorporal\":\"hombros\",\"funcionCorporal\":\"hombros\",\"pronostico\":\"hombros caidos.\",\"planTrabajo\":\"debe mover los hombros.\",\"fechaNotaTerapia\":\"2022-06-20T00:00:00.000+00:00\",\"horaNotaTerapia\":\"18:27\",\"observacion\":\"el paciente no puede mover los hombros.\",\"idTipoTerapia\":\"vE56AROqoarYg4arFYoa\",\"idEnfermera\":\"uwDVnZUTHtLgbtG7DqL2\"}"));
    
  }

}
