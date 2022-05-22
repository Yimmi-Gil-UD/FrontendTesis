import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  idUsuario:string;
  correo:null;
  password:null;

  constructor(private firestore: FirebaseService) { }

  ngOnInit() {
    
  }

  onLogin()
  {

    //console.log(this.firestore.getValor());  
    this.idUsuario = this.firestore.getValor();
    console.log(this.correo);
    console.log(this.password);
    console.log(this.idUsuario);
    this.getIdUserByCorreo(this.correo);
    this.correo = null;
    this.password = null;


  }


  /*
  getIdUser(correoUser:string){
    const path = 'Usuario/';
    this.firestore.getCollectionParametro<string>(path,'correo',correoUser ).subscribe(res =>{
    console.log(res);
    
    });
    
  }*/


  getIdUserByCorreo(correoUser:string){
    const path = 'Usuario/';
    this.firestore.GetUsersDataParametro(path,'correo',correoUser );/*.subscribe(res =>{
    console.log(res);
    
    });*/
    this.correo = null;
  }

}
