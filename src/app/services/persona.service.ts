import { Injectable } from '@angular/core';
import { Persona } from '../models/Persona';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_URL:string = 'https://633345b1573c03ab0b5b5964.mockapi.io/personas'

  constructor(private http: HttpClient) { }

  obtener(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.API_URL)
  }

  obtenerById(id:string): Observable<Persona> {
    return this.http.get<Persona>(`${this.API_URL}/${id}`)
  }

  crear(persona:Persona): Observable<Persona> {
    return this.http.post<Persona>(this.API_URL, persona)
  }

  editar(persona:Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.API_URL}/${persona.id}`, persona)
  }

  eliminar(id:string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`)
  }

}
