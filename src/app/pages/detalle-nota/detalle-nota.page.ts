import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaEnfermeriaDTO } from 'src/app/models/notaEnfermeriaDTO';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-detalle-nota',
  templateUrl: './detalle-nota.page.html',
  styleUrls: ['./detalle-nota.page.scss'],
})
export class DetalleNotaPage implements OnInit {

  NotaEnfermeriaDTOs: NotaEnfermeriaDTO[] = [];

  constructor(
    private notaService:NotaService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatosNotas();
  }

  cargarDatosNotas():void{
    const id = this.activateRoute.snapshot.params.id;
    this.notaService.detalle(id).subscribe(
      data => {

        this.NotaEnfermeriaDTOs = data;
        //console.log(this.NotaEnfermeriaDTOs)
               
      },
      err => {
        //console.log("Error");
      }
    );
    
  }

}
