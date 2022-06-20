import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaTerapia } from '../models/notaTerapia';
import { NotaTerapiaDTO } from '../models/notaTerapiaDTO';
import { TipoTerapiaDTO } from '../models/tipoTerapiaDTO';

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {

  notaTerapiaURL = 'http://localhost:8080/notaTerapia/'
  tipoTerapiaaURL = 'http://localhost:8080/tipoTerapia/'

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<NotaTerapiaDTO[]> {
    return this.httpClient.get<NotaTerapiaDTO[]>(this.notaTerapiaURL + 'list');
  }

  public listaTipoTerapia(): Observable<TipoTerapiaDTO[]> {
    return this.httpClient.get<TipoTerapiaDTO[]>(this.tipoTerapiaaURL + 'list');
  }

  public detalle(id: string): Observable<NotaTerapiaDTO[]> {
    return this.httpClient.get<NotaTerapiaDTO[]>(this.notaTerapiaURL + `detail/${id}`);
  }

  public crear(notaTerapia:NotaTerapia): Observable<boolean> {
    return this.httpClient.post<boolean>(this.notaTerapiaURL + 'save',notaTerapia);
  }

}
