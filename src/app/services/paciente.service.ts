import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteDTO } from '../models/pacienteDTO';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteUrl = 'http://localhost:8080/paciente/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<PacienteDTO[]> {
    return this.httpClient.get<PacienteDTO[]>(this.pacienteUrl + 'list');
  }

}
