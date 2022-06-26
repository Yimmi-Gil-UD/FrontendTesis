import { Component, OnInit } from '@angular/core';
import { NotaTerapiaDTO } from 'src/app/models/notaTerapiaDTO';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-admin-terapia',
  templateUrl: './admin-terapia.page.html',
  styleUrls: ['./admin-terapia.page.scss'],
})
export class AdminTerapiaPage implements OnInit {

  notasTerapia: NotaTerapiaDTO[] = [];
  textoBuscar = '';

  constructor(
    private terapiaService:TerapiaService
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  ionViewWillEnter()
  {
    this.cargarLista();
  }

  cargarLista(): void {
    this.terapiaService.lista().subscribe(
      data => {
        this.notasTerapia = data;
        //console.log(this.notasTerapia);
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
