import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  notas: string[] = ['Nota1', 'Nota2', 'Nota3', 'Nota4'];
  constructor() { }

  ngOnInit() {
  }

}
