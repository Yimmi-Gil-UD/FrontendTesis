import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaEnfermeria } from '../models/notaEnfermeria';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  notaEnfermeriaUrl = 'http://localhost:8080/nota/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<NotaEnfermeria[]> {
    return this.httpClient.get<NotaEnfermeria[]>(this.notaEnfermeriaUrl + 'list');
  }

  
}
