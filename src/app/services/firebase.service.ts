import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore:AngularFirestore) { }

  /*createDoc(){
    this.firestore.collection('Usuario')
  }*/

  /*getCollection(){
    console.log('estoy por leer una coleccion');
    this.firestore.collection('Usuario').valueChanges().subscribe((res) =>{
    console.log('respuesta -> ',res)
    })
  }*/

  getCollectionParametro<tipo>(path: string, parametro: string, value: string){
    const dataCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path
      , ref => ref.where(parametro, '==', value));
      return dataCollection.valueChanges();  
    
  }

}
