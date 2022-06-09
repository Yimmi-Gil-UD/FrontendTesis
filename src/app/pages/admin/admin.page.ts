import { Component, OnInit } from '@angular/core';
import { NotaEnfermeria } from 'src/app/models/notaEnfermeria';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  notas: NotaEnfermeria[] = [];

  constructor(
    private notaService:NotaService
  ) { }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.notaService.lista().subscribe(
      data => {
        this.notas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
