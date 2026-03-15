import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
 // private urlBase = 'https://tienda.grupo2.os/api';
  private urlBase = '/api';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.urlBase}/auth/login`, credentials).pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
    }

  getToken() {
    return localStorage.getItem('token');
  }

}
