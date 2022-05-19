import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  idUsuario:null;
  correo:null;
  password:null;

  constructor(private firestore: FirebaseService) { }

  ngOnInit() {
    
  }

  onLogin()
  {
    console.log("datos usuario: "+this.correo +" " +this.password)
    //this.getIdUser2();
    this.getIdUser(this.correo);
  }


  getIdUser(correoUser:string){
    const path = 'Usuario/';
    this.firestore.getCollectionParametro<string>(path,'correo',correoUser ).subscribe(res =>{
    console.log(res);
    
    });
  }

  /*getIdUser2(){
    this.firestore.getCollection();
  }*/
}
