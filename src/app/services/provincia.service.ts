import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Provincia } from '../models/Provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private API_URL:string = 'https://635af7816f97ae73a63a9e8d.mockapi.io/provincia'

  constructor(private http: HttpClient) { 

  }

  obtener(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.API_URL)
  }

  obtenerById(id:string): Observable<Provincia> {
    return this.http.get<Provincia>(`${this.API_URL}/${id}`)
  }
}
