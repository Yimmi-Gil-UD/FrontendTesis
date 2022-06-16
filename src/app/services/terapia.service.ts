import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaTerapiaDTO } from '../models/notaTerapiaDTO';

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {

  notaTerapiaURL = 'http://localhost:8080/notaTerapia/'

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<NotaTerapiaDTO[]> {
    return this.httpClient.get<NotaTerapiaDTO[]>(this.notaTerapiaURL + 'list');
  }

}
