import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfermera } from '../models/enfermera';
import { EnfermeraDTO } from '../models/enfermeraDTO';
import { GeneroDTO } from '../models/generoDTO';
import { TipoDocumentoDTO } from '../models/TipoDocumentoIdDTO';

@Injectable({
  providedIn: 'root'
})
export class EnfermeraService {

  enfermeraUrl = 'http://localhost:8080/enfermera/';
  tipoDocumentoUrl = 'http://localhost:8080/tipoDocumento/';
  tipoGeneroUrl = 'http://localhost:8080/genero/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<EnfermeraDTO[]> {
    return this.httpClient.get<EnfermeraDTO[]>(this.enfermeraUrl + 'list');
  }
  
  public detalle(id: string): Observable<EnfermeraDTO[]> {
    return this.httpClient.get<EnfermeraDTO[]>(this.enfermeraUrl + `detail/${id}`);
  }

  public crear(enfermera:Enfermera): Observable<boolean> {
    return this.httpClient.post<boolean>(this.enfermeraUrl + 'save',enfermera);
  }

  public listaDocumentos(): Observable<TipoDocumentoDTO[]> {
    return this.httpClient.get<TipoDocumentoDTO[]>(this.tipoDocumentoUrl + 'list');
  }

  public listaGenero(): Observable<GeneroDTO[]> {
    return this.httpClient.get<GeneroDTO[]>(this.tipoGeneroUrl + 'list');
  }
  

}
