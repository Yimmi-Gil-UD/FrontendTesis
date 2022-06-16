import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaEnfermeriaDTO } from '../models/notaEnfermeriaDTO';


@Injectable({
  providedIn: 'root'
})
export class NotaService {

  notaEnfermeriaUrl = 'http://localhost:8080/nota/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<NotaEnfermeriaDTO[]> {
    return this.httpClient.get<NotaEnfermeriaDTO[]>(this.notaEnfermeriaUrl + 'list');
  }

  
}
