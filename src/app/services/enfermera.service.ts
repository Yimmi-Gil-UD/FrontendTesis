import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnfermeraDTO } from '../models/enfermeraDTO';

@Injectable({
  providedIn: 'root'
})
export class EnfermeraService {

  enfermeraUrl = 'http://localhost:8080/enfermera/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<EnfermeraDTO[]> {
    return this.httpClient.get<EnfermeraDTO[]>(this.enfermeraUrl + 'list');
  }
}
