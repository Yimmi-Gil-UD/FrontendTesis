import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-terapia',
  templateUrl: './admin-terapia.page.html',
  styleUrls: ['./admin-terapia.page.scss'],
})
export class AdminTerapiaPage implements OnInit {

  notas: string[] = ['NotaTerapia1', 'NotaTerapia2', 'NotaTerapia3', 'NotaTerapia4'];
  textoBuscar = '';

  constructor() { }

  ngOnInit() {
  }

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }

}
