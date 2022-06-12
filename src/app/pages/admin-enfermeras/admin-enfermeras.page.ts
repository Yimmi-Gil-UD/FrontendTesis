import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-enfermeras',
  templateUrl: './admin-enfermeras.page.html',
  styleUrls: ['./admin-enfermeras.page.scss'],
})
export class AdminEnfermerasPage implements OnInit {

  enfermeras: string[] = ['carmen', 'Yenny', 'Alejandra', 'Gabriela'];

  constructor() { }

  ngOnInit() {
  }

}
