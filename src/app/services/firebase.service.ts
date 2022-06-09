import { Injectable, Input } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';





@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  constructor(private firestore:AngularFirestore) {

  }

 //Funcion generica, se puede implementar para mas busquedas
  async GetAllUser<tipo>(path: string, parametro: string, value: string){

  try{ 
    return await this.firestore.collection<tipo>(path, ref =>  ref.where(parametro, '==', value)).snapshotChanges();
  }catch(error){
    console.log("Error en el getAll",error)
  }
  
  }




}



