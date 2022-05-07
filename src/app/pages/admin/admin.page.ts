import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  notas: string[] = ['Nota1', 'Nota2', 'Nota3', 'Nota4'];

  constructor() { }

  ngOnInit() {
  }

}
