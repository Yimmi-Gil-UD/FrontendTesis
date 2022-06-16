import { Component, OnInit } from '@angular/core';
import { NotaTerapiaDTO } from 'src/app/models/notaTerapiaDTO';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-user-terapia',
  templateUrl: './user-terapia.page.html',
  styleUrls: ['./user-terapia.page.scss'],
})
export class UserTerapiaPage implements OnInit {

  notasTerapias: NotaTerapiaDTO[] = [];
  textoBuscar = '';

  constructor(
    private terapiaService:TerapiaService
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.terapiaService.lista().subscribe(
      data => {
        this.notasTerapias = data;
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
