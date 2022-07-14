import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoTerapiaDTO } from 'src/app/models/tipoTerapiaDTO';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-detalle-tipo-terapia',
  templateUrl: './detalle-tipo-terapia.page.html',
  styleUrls: ['./detalle-tipo-terapia.page.scss'],
})
export class DetalleTipoTerapiaPage implements OnInit {

  terapiaDTOs: TipoTerapiaDTO[] = [];

  constructor(
    private terapiaService:TerapiaService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatosTerapias();
  }

  cargarDatosTerapias():void{
    const id = this.activateRoute.snapshot.params.id;
    this.terapiaService.detalleTipoTerapia(id).subscribe(
      data => {

        this.terapiaDTOs = data;
        console.log(this.terapiaDTOs)
               
      },
      err => {
        console.log("Error");
      }
    );
    
  }

}
