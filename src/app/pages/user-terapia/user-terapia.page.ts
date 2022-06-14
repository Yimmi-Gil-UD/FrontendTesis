import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-terapia',
  templateUrl: './user-terapia.page.html',
  styleUrls: ['./user-terapia.page.scss'],
})
export class UserTerapiaPage implements OnInit {

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
