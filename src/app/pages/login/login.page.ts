import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginDTO } from 'src/app/models/LoginDTO';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoginService } from 'src/app/services/login.service';
import { RestLoginService } from 'src/app/services/rest-login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginDTO: LoginDTO;

  correo = "";
  idUsuario = "";
  password = "";
  mensajeError = "";

  correoRest = "";
  passwordRest = "";

  ingreso = false;


  constructor(private firestore: FirebaseService, 
    private toastController: ToastController,
    private restlogin: RestLoginService,
    private loginService : LoginService,
    private router:Router
    ) { }

  

  ngOnInit() {
  this.validarLogin();
  }

  onLogin()
  {

    //this.getIdUserByCorreo(this.correo);
    this.getId(this.correo);
    //console.log(this.correo);
    //console.log(this.password);
    //this.idUsuario = this.firestore.valor;
    //console.log("Variable del id usuario:",this.idUsuario);
 
    this.correoRest = this.correo;
    this.passwordRest = this.password;
    this.correo = null;
    this.password = null;

    let TIME_IN_MS = 2000;
    let hideFooterTimeout = setTimeout( () => {
     this.conexionLogin();
}, TIME_IN_MS);
    //this.conexionLogin();
  }

  conexionLogin()
  {
    this.loginDTO = new LoginDTO(this.idUsuario,this.correoRest,this.passwordRest);
    this.loginService.login(this.loginDTO).subscribe(
      data => {
        this.restlogin.setId(data.id);
        this.restlogin.setCorreo(data.correo);
        this.restlogin.setRol(data.rol);
        this.ingreso = true;
        this.router.navigate(['/']);
      },
      err => {
        this.mensajeError = "El correo o la contraseña son incorrectos";
        this.presentToast();
      }
      
    );
  }

  /*
  getIdUserByCorreo(correoUser:string){
    const path = 'Enfermera/';
    this.firestore.GetUsersDataParametro(path,'correo',correoUser ).subscribe(res =>{
    console.log(res);
    
    });

  }*/

  getId(correoUser:string) 
  {
    const path = 'Enfermera/';
    this.firestore.GetAllUser(path,'correo',correoUser).then(firebaseResponse =>{
      firebaseResponse.subscribe(listaEnfermera =>{
       
        listaEnfermera.map(enfermeraRef =>{
        this.idUsuario = enfermeraRef.payload.doc.id;
          
        })
        //console.log("desde el metodo: ",this.idUsuario);
        return this.idUsuario;
      })
    })
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: this.mensajeError,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

  salir(): void{
    this.restlogin.logOut();
    this.ingreso = false;
  }

  validarLogin(): void
  {
    this.ingreso = this.restlogin.getId() != null;
  }



}
