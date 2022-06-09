import { Injectable, Input } from '@angular/core';
import { identity, Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { promise } from 'protractor';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  constructor(private firestore:AngularFirestore) {

  }

  valor: string;

  /*
  //Funcion generica, se puede implementar para mas busquedas
  GetUsersDataParametro<tipo>(path: string, parametro: string, value: string){

  const UsuariosCollection = this.firestore.collection<tipo>(path
      , ref =>  ref.where(parametro, '==', value)).get().toPromise().then((snapshot) => {
      snapshot.forEach((doc) =>  {
      //console.log(doc.id+" => "+ doc.data());        
      this.valor = doc.id;  
      //console.log("Valor desde el service " + this.valor);
      });
    });
   }
*/


  async GetAllUser<tipo>(path: string, parametro: string, value: string){

  try{ 
    //return await this.firestore.collection(collection).snapshotChanges();
    return await this.firestore.collection<tipo>(path, ref =>  ref.where(parametro, '==', value)).snapshotChanges();
  }catch(error){
    console.log("Error en el getAll",error)
  }
  
  }




}



