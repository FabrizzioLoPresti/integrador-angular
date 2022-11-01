import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Ciudad } from '../models/Ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private API_URL:string = 'https://635af7816f97ae73a63a9e8d.mockapi.io/ciudad'

  constructor(private http:HttpClient) { }

  obtener(idProvincia:string): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.API_URL}?idprovincia=${idProvincia}`)
  }

  obtenerById(id:string): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.API_URL}/${id}`)
  }
}
