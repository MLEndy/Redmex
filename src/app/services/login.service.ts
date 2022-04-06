import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../models/response-model';
import { UsuarioInterface } from '../models/usuario-model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) {}

  login(usuario: UsuarioInterface): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.url, usuario);
  }
}
