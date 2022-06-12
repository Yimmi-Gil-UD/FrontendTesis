import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pacientes',
  templateUrl: './admin-pacientes.page.html',
  styleUrls: ['./admin-pacientes.page.scss'],
})
export class AdminPacientesPage implements OnInit {

  pacientes: string[] = ['José', 'Carlos', 'Camilo', 'Miguel'];

  constructor() { }

  ngOnInit() {
  }

}
