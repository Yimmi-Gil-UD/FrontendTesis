import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDiscapacidadDTO } from '../models/categoriaDiscapacidadDTO';
import { GeneroDTO } from '../models/generoDTO';
import { GrupoSanguineoDTO } from '../models/grupoSanguineoDTO';
import { Paciente } from '../models/Paciente';
import { PacienteDTO } from '../models/pacienteDTO';
import { TipoDocumentoDTO } from '../models/TipoDocumentoIdDTO';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteUrl = 'http://localhost:8080/paciente/';
  tipoDocumentoUrl = 'http://localhost:8080/tipoDocumento/';
  tipoGeneroUrl = 'http://localhost:8080/genero/';
  categoriaUrl = 'http://localhost:8080/categoria/';
  grupoSanguineoUrl = 'http://localhost:8080/grupoSanguineo/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<PacienteDTO[]> {
    return this.httpClient.get<PacienteDTO[]>(this.pacienteUrl + 'list');
  }

  public detalle(id: string): Observable<PacienteDTO[]> {
    return this.httpClient.get<PacienteDTO[]>(this.pacienteUrl + `detail/${id}`);
  }

  public crear(paciente:Paciente): Observable<boolean> {
    return this.httpClient.post<boolean>(this.pacienteUrl + 'save',paciente);
  }

  public listaDocumentos(): Observable<TipoDocumentoDTO[]> {
    return this.httpClient.get<TipoDocumentoDTO[]>(this.tipoDocumentoUrl + 'list');
  }

  public listaGenero(): Observable<GeneroDTO[]> {
    return this.httpClient.get<GeneroDTO[]>(this.tipoGeneroUrl + 'list');
  }

  public listaCategoriaDiscapacidad(): Observable<CategoriaDiscapacidadDTO[]> {
    return this.httpClient.get<CategoriaDiscapacidadDTO[]>(this.categoriaUrl + 'list');
  }

  public listaGrupoSanguineo(): Observable<GrupoSanguineoDTO[]> {
    return this.httpClient.get<GrupoSanguineoDTO[]>(this.grupoSanguineoUrl + 'list');
  }

}
