import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { Persona } from '../models/Persona';

@Injectable({
  providedIn: 'root'
})
export class EstadoPersonaService {

  private estadoSubject: Subject<string>;
  
  constructor(private http:HttpClient) { 
    this.estadoSubject = new Subject<string>();
  }

  cambiarEstado(estado:string) {
    this.estadoSubject.next(estado);
  }

  estadoCambio(): Observable<string> {
    return this.estadoSubject.asObservable();
  }
}
