import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaEnfermeria } from '../models/notaEnfermeria';
import { NotaEnfermeriaDTO } from '../models/notaEnfermeriaDTO';
import { RestLoginService } from './rest-login.service';


@Injectable({
  providedIn: 'root'
})
export class NotaService {


  //notaEnfermeriaUrl = 'http://localhost:8080/nota/';
  notaEnfermeriaUrl = this.restlogin.ip+':8080/nota/';

  constructor(
    private httpClient:HttpClient,
    private restlogin: RestLoginService,
    ) { }

  public lista(): Observable<NotaEnfermeriaDTO[]> {
    return this.httpClient.get<NotaEnfermeriaDTO[]>(this.notaEnfermeriaUrl + 'list');
  }

  public detalle(id: string): Observable<NotaEnfermeriaDTO[]> {
    return this.httpClient.get<NotaEnfermeriaDTO[]>(this.notaEnfermeriaUrl + `detail/${id}`);
  }

  public crear(notaEnfermeria:NotaEnfermeria): Observable<boolean> {
    return this.httpClient.post<boolean>(this.notaEnfermeriaUrl + 'save',notaEnfermeria);
  }
  
  public actualizar(id:string, notaEnfermeria:NotaEnfermeria): Observable<boolean> {
    return this.httpClient.put<boolean>(this.notaEnfermeriaUrl + `update/${id}`,notaEnfermeria);
  }

  
}
