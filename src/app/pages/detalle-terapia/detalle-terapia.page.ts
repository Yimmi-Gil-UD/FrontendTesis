import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaTerapiaDTO } from 'src/app/models/notaTerapiaDTO';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-detalle-terapia',
  templateUrl: './detalle-terapia.page.html',
  styleUrls: ['./detalle-terapia.page.scss'],
})
export class DetalleTerapiaPage implements OnInit {

  notaTerapiaDTOs: NotaTerapiaDTO[] = [];

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
    this.terapiaService.detalle(id).subscribe(
      data => {

        this.notaTerapiaDTOs = data;
        //console.log(this.notaTerapiaDTOs)
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

}
