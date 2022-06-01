import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  constructor(private firestore:AngularFirestore) {

  }

  valor: string;


  //Funcion generica, se puede implementar para mas busquedas
  async GetUsersDataParametro<tipo>(path: string, parametro: string, value: string){

  const UsuariosCollection = await this.firestore.collection<tipo>(path
      , ref =>  ref.where(parametro, '==', value)).get().toPromise().then((snapshot) => {
      snapshot.forEach((doc) => {
      //console.log(doc.id+" => "+ doc.data());        
      this.valor = doc.id;  
      //console.log("Valor desde el service " + this.valor);
      });
    });
   }

}



