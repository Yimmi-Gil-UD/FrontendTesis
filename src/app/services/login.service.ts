import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/loginDTO';
import { LoginResponseDTO } from '../models/loginResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  Url = 'http://localhost:8080/auth/';

  constructor(private httpClient:HttpClient) { }

  public login(loginDTO: LoginDTO): Observable<LoginResponseDTO>{
    return this.httpClient.post<LoginResponseDTO>(this.Url +'login',loginDTO);
  }
}
