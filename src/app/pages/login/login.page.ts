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
  showPassword = false;
  passwordToggleIcon = 'eye';


  constructor(
    private firestore: FirebaseService, 
    private toastController: ToastController,
    private restlogin: RestLoginService,
    private loginService : LoginService,
    private router:Router
    ) { }

  

  ngOnInit() {
  this.validarLogin();
  }

  ionViewWillEnter()
  {
    this.validarLogin();
  }

  onLogin()
  {

    this.getId(this.correo);
 
    this.correoRest = this.correo;
    this.passwordRest = this.password;
    this.correo = null;
    this.password = null;

    let TIME_IN_MS = 2000;
    let hideFooterTimeout = setTimeout( () => {
     this.conexionLogin();
}, TIME_IN_MS);
  }

  conexionLogin()
  {
    this.loginDTO = new LoginDTO(this.idUsuario,this.correoRest,this.passwordRest);
    this.loginService.login(this.loginDTO).subscribe(
      data => {
        this.restlogin.setId(data.id);
        this.restlogin.setCorreo(data.correo);
        this.restlogin.setRol(data.rol);
        if(data.rol == 'Inactivo')
        {
          this.presentToast("La enfermera(o) no se encuentra activa");
        }
        else{
          this.ingreso = true;
          this.router.navigate(['/']);
        }
        
      },
      err => {
        //this.mensajeError = "El correo o la contraseña son incorrectos";
        this.presentToast("El correo o la contraseña son incorrectos");
      }
      
    );
  }

  getId(correoUser:string) 
  {
    const path = 'Enfermera/';
    this.firestore.GetAllUser(path,'correo',correoUser).then(firebaseResponse =>{

        firebaseResponse.subscribe(listaEnfermera =>{
       
          listaEnfermera.map(enfermeraRef =>{
          this.idUsuario = enfermeraRef.payload.doc.id;
          //console.log("Validacion del id 1: ",this.idUsuario);
          },
          err =>{
            this.presentToast("El correo o la contraseña son incorrectos");
          })
          //console.log("Validacion del id 2: ",this.idUsuario);
          return this.idUsuario;
          
        })

    })
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
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


  verContrasena():void
  {
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye')
    {
      this.passwordToggleIcon = 'eye-off';
    }
    else{
      this.passwordToggleIcon = 'eye';
    }
  }



}
