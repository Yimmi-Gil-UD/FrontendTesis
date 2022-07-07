import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestLoginService } from 'src/app/services/rest-login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  ingreso:boolean;
  isAdmin:boolean;

  constructor(
    private restlogin: RestLoginService,
    private router: Router
    ) { }

  ngOnInit() {
    this.validarSalida();
  }

  salida(){
      this.restlogin.logOut();
      this.ingreso = false;
      this.isAdmin = false;
      this.router.navigate(['/login']);
  }


  validarSalida(): void {
    this.ingreso = this.restlogin.getId()!=null;
    if(this.restlogin.getRol() == 'ADMIN')
    {
      this.isAdmin = true;
    }
    
  }

 }
