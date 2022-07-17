import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDiscapacidadDTO } from '../models/categoriaDiscapacidadDTO';
import { EstadoDTO } from '../models/estadoDTO';
import { GeneroDTO } from '../models/generoDTO';
import { GrupoSanguineoDTO } from '../models/grupoSanguineoDTO';
import { Paciente } from '../models/paciente';
import { PacienteDTO } from '../models/pacienteDTO';
import { TipoDocumentoDTO } from '../models/TipoDocumentoIdDTO';
import { RestLoginService } from './rest-login.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  /*
  pacienteUrl = 'http://localhost:8080/paciente/';
  tipoDocumentoUrl = 'http://localhost:8080/tipoDocumento/';
  tipoGeneroUrl = 'http://localhost:8080/genero/';
  categoriaUrl = 'http://localhost:8080/categoria/';
  grupoSanguineoUrl = 'http://localhost:8080/grupoSanguineo/';
  estadoUrl = 'http://localhost:8080/estado/';
  */

  pacienteUrl = this.restlogin.ip+':8080/paciente/';
  tipoDocumentoUrl = this.restlogin.ip+':8080/tipoDocumento/';
  tipoGeneroUrl = this.restlogin.ip+':8080/genero/';
  categoriaUrl = this.restlogin.ip+':8080/categoria/';
  grupoSanguineoUrl = this.restlogin.ip+':8080/grupoSanguineo/';
  estadoUrl = this.restlogin.ip+':8080/estado/';

  constructor(
    private httpClient:HttpClient,
    private restlogin: RestLoginService,
    ) { }

  public lista(): Observable<PacienteDTO[]> {
    return this.httpClient.get<PacienteDTO[]>(this.pacienteUrl + 'list');
  }

  public detalle(id: string): Observable<PacienteDTO[]> {
    return this.httpClient.get<PacienteDTO[]>(this.pacienteUrl + `detail/${id}`);
  }

  public crear(paciente:Paciente): Observable<boolean> {
    return this.httpClient.post<boolean>(this.pacienteUrl + 'save',paciente);
  }

  public actualizar(id:string, paciente:Paciente): Observable<boolean> {
    return this.httpClient.put<boolean>(this.pacienteUrl + `update/${id}`,paciente);
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

  public listaEstado(): Observable<EstadoDTO[]> {
    return this.httpClient.get<EstadoDTO[]>(this.estadoUrl + 'list');
  }

}
