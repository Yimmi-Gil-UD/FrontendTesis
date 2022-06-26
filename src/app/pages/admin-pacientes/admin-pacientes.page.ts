import { Component, OnInit } from '@angular/core';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-admin-pacientes',
  templateUrl: './admin-pacientes.page.html',
  styleUrls: ['./admin-pacientes.page.scss'],
})
export class AdminPacientesPage implements OnInit {

  //pacientes: string[] = ['José', 'Carlos', 'Camilo', 'Miguel'];
  pacientes: PacienteDTO[] = [];
  textoBuscar = '';

  constructor(
    private pacienteService:PacienteService
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  ionViewWillEnter()
  {
    this.cargarLista();
  }
  

  cargarLista(): void {
    this.pacienteService.lista().subscribe(
      data => {
        this.pacientes = data;
        //console.log(this.pacientes);
      },
      err => {
        console.log(err);
      }
    );
  }

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }




}
