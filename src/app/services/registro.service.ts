import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../models/usuario-model';
import { ResponseInterface } from '../models/response-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private url: string = 'http://127.0.0.1:8000/api/register';

  constructor(private http: HttpClient) {}

  registro(usuario: UsuarioInterface): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.url, usuario);
  }
}
