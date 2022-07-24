import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaTerapia } from '../models/notaTerapia';
import { NotaTerapiaDTO } from '../models/notaTerapiaDTO';
import { TipoTerapia } from '../models/tipoTerapia';
import { TipoTerapiaDTO } from '../models/tipoTerapiaDTO';
import { RestLoginService } from './rest-login.service';

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {

  //notaTerapiaURL = 'http://localhost:8080/notaTerapia/'
  //tipoTerapiaaURL = 'http://localhost:8080/tipoTerapia/'

  notaTerapiaURL = this.restlogin.ip+':8080/notaTerapia/'
  tipoTerapiaaURL = this.restlogin.ip+':8080/tipoTerapia/'

  constructor(
    private httpClient:HttpClient,
    private restlogin: RestLoginService,
    ) { }

  public lista(): Observable<NotaTerapiaDTO[]> {
    return this.httpClient.get<NotaTerapiaDTO[]>(this.notaTerapiaURL + 'list');
  }

  public listaTipoTerapia(): Observable<TipoTerapiaDTO[]> {
    return this.httpClient.get<TipoTerapiaDTO[]>(this.tipoTerapiaaURL + 'list');
  }

  public detalleTipoTerapia(id:string): Observable<TipoTerapiaDTO[]> {
    return this.httpClient.get<TipoTerapiaDTO[]>(this.tipoTerapiaaURL + `detail/${id}`);
  }

  public detalle(id: string): Observable<NotaTerapiaDTO[]> {
    return this.httpClient.get<NotaTerapiaDTO[]>(this.notaTerapiaURL + `detail/${id}`);
  }

  public crear(notaTerapia:NotaTerapia): Observable<boolean> {
    return this.httpClient.post<boolean>(this.notaTerapiaURL + 'save',notaTerapia);
  }

  public crearTipoTerapia(tipoTerapia:TipoTerapia): Observable<boolean> {
    return this.httpClient.post<boolean>(this.tipoTerapiaaURL + 'save',tipoTerapia);
  }

  public actualizar(id:string, notaTerapia:NotaTerapia): Observable<boolean> {
    return this.httpClient.put<boolean>(this.notaTerapiaURL + `update/${id}`,notaTerapia);
  }

  public actualizarTerapia(id:string, tipoTerapia:TipoTerapia): Observable<boolean> {
    return this.httpClient.put<boolean>(this.tipoTerapiaaURL + `update/${id}`,tipoTerapia);
  }

  public EliminarTipoTerapia(id:string): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.tipoTerapiaaURL + `delete/${id}`);
  }

}
