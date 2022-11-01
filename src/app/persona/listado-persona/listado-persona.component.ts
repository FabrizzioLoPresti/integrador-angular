import { Component, OnInit, OnDestroy } from '@angular/core';

import { Persona } from 'src/app/models/Persona';
import { Rol } from 'src/app/models/Rol';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { EstadoPersonaService } from 'src/app/services/estado-persona.service';
import { EsMayorPipe } from 'src/app/pipes/es-mayor.pipe';
import { CambiarColorDirective } from 'src/app/directives/cambiar-color.directive';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-listado-persona',
  templateUrl: './listado-persona.component.html',
  styleUrls: ['./listado-persona.component.css']
})
export class ListadoPersonaComponent implements OnInit, OnDestroy {

  // $listado: Observable<Persona[]>;
  // $roles: Observable<Rol[]>;
  roles: Rol[];
  listado: Persona[];
  $valorObservable: Observable<string>;
  fecha: Date = new Date();
  private subscription: Subscription;

  constructor(private personaService:PersonaService, private rolService:RolService, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private estadoPersonaService:EstadoPersonaService, private router:Router) { 
    // this.$listado = new Observable<Persona[]>();
    // this.$roles = new Observable<Rol[]>();
    this.roles = [];
    this.listado = [];
    this.$valorObservable = new Observable<string>();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.cargarListado();

    // Escuchar cambio de estadoPersona
    this.$valorObservable = this.estadoPersonaService.estadoCambio();
    this.$valorObservable.subscribe({
      next: (valor:string) => {
        alert(valor)
        this.cargarListado();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarListado(): void {
    // this.$listado = this.personaService.obtener();
    // this.$roles = this.rolService.obtener();

    this.subscription.add(
      this.personaService.obtener().subscribe({
        next: (resPersonas: Persona[]) => {
          this.listado = resPersonas;
          this.listado.forEach( p => {
            this.rolService.obtenerById(p.idRol).subscribe({
              next: (resRol:Rol) => {
                p.rol = resRol;
              }
            })
            this.provinciaService.obtenerById(p.direccion.idProvincia).subscribe({
              next: (resProvincia:Provincia) => {
                p.direccion.provincia = resProvincia
              }
            })
            this.ciudadService.obtenerById(p.direccion.idCiudad).subscribe({
              next: (resCiudad:Ciudad) => {
                p.direccion.ciudad = resCiudad
              }
            })
          })
        }
      })
    )
  }

  editar(id:string): void {
    this.router.navigate(['editar', id])
  }

}
