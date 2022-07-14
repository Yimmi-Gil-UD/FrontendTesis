import { Component, OnInit } from '@angular/core';
import { NotaTerapiaDTO } from 'src/app/models/notaTerapiaDTO';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RestLoginService } from 'src/app/services/rest-login.service';
import { TerapiaService } from 'src/app/services/terapia.service';

@Component({
  selector: 'app-user-terapia',
  templateUrl: './user-terapia.page.html',
  styleUrls: ['./user-terapia.page.scss'],
})
export class UserTerapiaPage implements OnInit {

  notasTerapias: NotaTerapiaDTO[] = [];
  textoBuscar = '';
  notasId:string[]=[];
  //notasTerapias:any[]=[];
  monthsArray = [];

  constructor(
    private terapiaService:TerapiaService,
    private firestore: FirebaseService,
    private restlogin: RestLoginService
  ) { }

  ngOnInit() {
    //this.cargarLista();
  }

  ionViewWillEnter()
  {
    this.cargarLista();
    
  }

  cargarLista(): void {
    this.terapiaService.lista().subscribe(
      data => {
        this.notasTerapias = data;
        //console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }


  /* VALIDAR EL METODO PARA TRAER UNICAMENTE LAS NOTAS DE CADA ENFERMERA 
  cargarLista():void
  {

    const path = 'NotaTerapia/';
    this.firestore.GetAllUser(path,'idEnfermera',this.restlogin.getId()).then(firebaseResponse =>{
      firebaseResponse.subscribe( data1 =>{
        data1.map(notas =>{
          //console.log(notas.payload.doc.id);
          this.notasId.push(notas.payload.doc.id);

          console.log(this.notasId);

            //console.log(element);
         

              for(let i =0; i< this.notasId.length;i++)
              {
                //console.log(this.notasId[i]);
          
                this.terapiaService.detalle(this.notasId[i]).subscribe(
                  data=> {
                    //this.notasTerapias= data;
                    this.monthsArray.push(data);
                    console.log(this.monthsArray)
                  },
                  err => {
                    console.log(err);
                  }
                )
          
              }
              //this.notasTerapias = this.monthsArray;

            


                   

        })

      })
    })




  }
   FIN VALIDACION METODO */

  

  buscar(event){
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }

}
