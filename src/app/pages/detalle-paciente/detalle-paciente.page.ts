import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { PacienteService } from 'src/app/services/paciente.service';
import { RestLoginService } from 'src/app/services/rest-login.service';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.page.html',
  styleUrls: ['./detalle-paciente.page.scss'],
})
export class DetallePacientePage implements OnInit {

  
  pacienteDTOs: PacienteDTO[] = [];

  constructor(
    private pacienteService: PacienteService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatosPaciente();
   

  }

  cargarDatosPaciente():void{
    const id = this.activateRoute.snapshot.params.id;
    this.pacienteService.detalle(id).subscribe(
      data => {

        this.pacienteDTOs = data;
        //console.log(this.pacienteDTOs)
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }


}
