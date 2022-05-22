import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { actionSheetController } from '@ionic/core';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  constructor(private firestore:AngularFirestore) { }

   valor: string;

 
   

  /*createDoc(){
    this.firestore.collection('Usuario')
  }*/

  /*getCollection(){
    console.log('estoy por leer una coleccion');
    this.firestore.collection('Usuario').valueChanges().subscribe((res) =>{
    console.log('respuesta -> ',res)
    })
  }*/

 /* getCollectionParametro<tipo>(path: string, parametro: string, value: string){
    const dataCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path
      , ref => ref.where(parametro, '==', value));
      return dataCollection.valueChanges();  
      //return dataCollection.snapshotChanges();
      
  }*/

  /*
  GetUsersData() {
    const UsuariosCollection = this.firestore.collection('Usuario').get();

      UsuariosCollection.toPromise().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id+" => "+doc.data());        
      });
    });

  }
*/
  /*setCorreoByUser(correoUsuario: string)
  {
    
    this.email = correoUsuario;
    const UsuariosCollection = this.firestore.collection('Usuario/'
    , ref => ref.where('correo', '==',this.email));
    
  } */


  
  /*
  UsuariosCollection = this.firestore.collection('Usuario/'
  , ref => ref.where('correo', '==', this.email));*7


  /*setCorreoByUser(correoUsuario: string)
  {
    const UsuariosCollection = this.firestore.collection('Usuario/'
    , ref => ref.where('correo', '==', correoUsuario));
  }  */
   


  GetUsersDataParametro<tipo>(path: string, parametro: string, value: string){

  const UsuariosCollection = this.firestore.collection<tipo>(path
      , ref => ref.where(parametro, '==', value)).get().toPromise().then((snapshot) => {
      snapshot.forEach((doc) => {
        //console.log(doc.id+" => "+doc.data());        
        this.valor = doc.id;  
        //console.log(this.valor);
      });
      return this.valor;
      this.valor = "";
    });

    }

    getValor()
    {
      return this.valor;
      this.valor = "";
    }



}



