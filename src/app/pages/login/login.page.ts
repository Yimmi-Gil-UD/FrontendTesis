import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  idUsuario = '';
  correo = '';
  password = '';
  mensajeError = '';


  constructor(private firestore: FirebaseService, 
    private toastController: ToastController) { }

  

  ngOnInit() {
    
  }

  onLogin()
  {

    this.getIdUserByCorreo(this.correo);
    console.log(this.correo);
    console.log(this.password);
    this.idUsuario = this.firestore.valor;
    console.log(this.idUsuario);
 
    
    //this.loginEnfermera = new LoginEnfermera("jesY7wlt3NRFjNlKIXX2","User@gmail.com","123456789**95");


    //this.firestore.valor = "";
    this.correo = null;
    this.password = null;
    
  }



  getIdUserByCorreo(correoUser:string){
    const path = 'Enfermera/';
    this.firestore.GetUsersDataParametro(path,'correo',correoUser );/*.subscribe(res =>{
    console.log(res);
    
    });*/

  }

}
