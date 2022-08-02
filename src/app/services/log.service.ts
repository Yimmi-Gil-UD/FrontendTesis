import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogRegistro } from '../models/logRegistro';
import { LogRegistroDTO } from '../models/logRegistroDTO';
import { RestLoginService } from './rest-login.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

logUrl = this.restlogin.ip+':8080/log/';

  constructor(
    private httpClient:HttpClient,
    private restlogin: RestLoginService,
  ) { }

  public lista(): Observable<LogRegistroDTO[]> {
    return this.httpClient.get<LogRegistroDTO[]>(this.logUrl + 'list');
  }

  public crear(logRegistro:LogRegistro): Observable<boolean> {
    return this.httpClient.post<boolean>(this.logUrl + 'save',logRegistro);
  }
}
