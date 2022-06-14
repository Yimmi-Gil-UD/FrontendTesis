import { Component, OnInit } from '@angular/core';
import { EnfermeraDTO } from 'src/app/models/enfermeraDTO';
import { EnfermeraService } from 'src/app/services/enfermera.service';

@Component({
  selector: 'app-admin-enfermeras',
  templateUrl: './admin-enfermeras.page.html',
  styleUrls: ['./admin-enfermeras.page.scss'],
})
export class AdminEnfermerasPage implements OnInit {

  //enfermeras: string[] = ['carmen', 'Yenny', 'Alejandra', 'Gabriela'];
  enfermeras: EnfermeraDTO[] = [];
  textoBuscar = '';

  constructor(
    private enfermeraService:EnfermeraService
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.enfermeraService.lista().subscribe(
      data => {
        this.enfermeras = data;
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
