import { Component, OnDestroy, OnInit } from '@angular/core';

import { Persona } from 'src/app/models/Persona';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ValidarRolUusuario } from 'src/app/validators/ValidarRolUsuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/models/Rol';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  mostrarRol: boolean = false;
  id: string = '';
  subscription:Subscription;
  persona: Persona = {  } as Persona;
  $persona: Observable<Persona>;
  $provincias: Observable<Provincia[]>;
  $ciudades: Observable<Ciudad[]>;
  $roles: Observable<Rol[]>;
  constructor(private formBuilder:FormBuilder, private personaService:PersonaService, private rolService:RolService, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.subscription = new Subscription()
    this.$persona = new Observable<Persona>();
    this.$provincias = new Observable<Provincia[]>();
    this.$ciudades = new Observable<Ciudad[]>();
    this.$roles = new Observable<Rol[]>();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.id = params['id']
          this.$provincias = this.provinciaService.obtener();
          this.$roles = this.rolService.obtener();
          this.personaService.obtenerById(this.id).subscribe({
            next: (resPersona: Persona) => {
              this.persona = resPersona
              this.$ciudades = this.ciudadService.obtener(this.persona.direccion.idProvincia)
              this.cargarDatos();
              console.log(this.persona)
            }
          })
        }
      })
    )
  }

  cargarDatos(): void {
    this.formulario = this.formBuilder.group({
      nombre: [this.persona.nombre, [
        Validators.required,
        Validators.minLength(3)
      ]],
      direccion: this.formBuilder.group({
        calle: [this.persona.direccion.calle, [
          Validators.required
        ]],
        nro: [this.persona.direccion.nro],
        idProvincia: [this.persona.direccion.idProvincia, [
          Validators.required
        ]],
        idCiudad: [this.persona.direccion.idCiudad, [
          Validators.required
        ]]
      }),
      tieneRol: [true],
      idRol: [this.persona.idRol, [
        ValidarRolUusuario
      ]] // insertar validator propio


    })

    if(this.formulario.controls['tieneRol'].value === true) {
      this.mostrarRol = true
    }

    this.formulario.controls['tieneRol'].valueChanges.subscribe((valor) => {
      this.mostrarRol = valor;
    })

    this.formulario.controls['direccion'].get('idProvincia')?.valueChanges.subscribe((valor) => {
      this.$ciudades = this.ciudadService.obtener(valor);
    })
  }

  enviar(): void {
    if(this.formulario.valid) {
      this.persona = this.formulario.value
      this.persona.id = this.id
      console.log(this.persona)
      this.subscription.add(
        this.personaService.editar(this.persona).subscribe({
          next: () => {
            alert('Persona actualizada correctamente')
            this.router.navigate([''])
          },
          error: (error) => {
            alert('Error al actualizar persona')
          }
        })
      )
    } else {
      alert('Formulario invalido')
    }
  }

  cancelar(): void {
    const respuesta = confirm('Esta seguro de cancelar?')
    if(respuesta) this.router.navigate([''])
  }
}
