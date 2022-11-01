import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { Persona } from 'src/app/models/Persona';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';
import { Rol } from 'src/app/models/Rol';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { RolService } from 'src/app/services/rol.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ValidarRolUusuario } from 'src/app/validators/ValidarRolUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.css']
})
export class AltaPersonaComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  mostrarRol: boolean = false;
  $provincias: Observable<Provincia[]>;
  $ciudades: Observable<Ciudad[]>;
  $roles: Observable<Rol[]>;
  subscription: Subscription;
  persona:Persona = {  } as Persona;
  constructor( private formBuilder:FormBuilder, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private rolService:RolService, private personaService:PersonaService, private router:Router ) {
    this.$provincias = new Observable<Provincia[]>();
    this.$ciudades = new Observable<Ciudad[]>;
    this.$roles = new Observable<Rol[]>;
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.$provincias = this.provinciaService.obtener();
    this.$roles = this.rolService.obtener();
    
    this.formulario = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      direccion: this.formBuilder.group({
        calle: ['', [
          Validators.required
        ]],
        nro: [0],
        idProvincia: [0, [
          Validators.required
        ]],
        idCiudad: [0, [
          Validators.required
        ]]
      }),
      tieneRol: [false],
      idRol: ['', [
        ValidarRolUusuario
      ]] // insertar validator propio
    })

    this.formulario.controls['tieneRol'].valueChanges.subscribe((valor) => {
      this.mostrarRol = valor
    })

    this.formulario.controls['direccion'].get('nro')?.valueChanges.subscribe((valor) => {
      console.log(valor)
    })

    this.formulario.controls['direccion'].get('idProvincia')?.valueChanges.subscribe((valor) => {
      this.$ciudades = this.ciudadService.obtener(valor);
    })
  }

  enviar(): void {
    if(this.formulario.valid) {
      // console.log(this.formulario.value)
      this.persona = this.formulario.value;
      console.log(this.persona)
      this.subscription.add(
        this.personaService.crear(this.persona).subscribe({
          next: (resPersona:Persona) => {
            alert('Persona creada correctamente')
            this.router.navigate(['']);
          },
          error: (error) => {
            alert('Error al crear la persona')
          }
        })
      )
    } else {
      alert('Completar los campos correctamente')
    }
  }

  cancelar(): void {
    const respuesta = confirm('Esta seguro que desea cancelar?')
    if(respuesta) this.router.navigate([''])
  }
}
