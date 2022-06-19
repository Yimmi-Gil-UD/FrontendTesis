import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';

@Component({
  selector: 'app-detalle-enfermera',
  templateUrl: './detalle-enfermera.page.html',
  styleUrls: ['./detalle-enfermera.page.scss'],
})
export class DetalleEnfermeraPage implements OnInit {

  enfermeraDTOs: EnfermeraDTO[] = [];

  constructor(
    private enfermeraService:EnfermeraService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatosEnfermera();
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

}
