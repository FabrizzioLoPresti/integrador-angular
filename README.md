# CompletoV1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Simplificado
1. Borrar HTML del index.html
2. Importar modulos (2) necesarios en el App Modules
3. Crear componentes
4. Establecer las routes
5. Instalar Bootstrap y crear un Navbar en el App.html referenciando los links con routerLink
6. Tabla de Bootstrap para Listado
7. Crear Modelos - Interfaces
8. Crear Servicios y llamados a la API importando Observer, HttpClient en el Constructor
9. En Componente de listado consultar la API de forma multiple con subscription, no con Pipe | Async
10. En Listado HTML recorrer con *ngFor el resultado de la consulta a la API y colocar el rol?.nombre en el caso de que pueda llegar a ser undefined
11. Crear Componente de Baja, en HTML con button que llame (click)="eliminar()"
12. Enviar al Componente de Baja [id]="p.id" desde el Listado HTML y recibirlo en el TS del Componente de Baja como @Input()
13. Crear Service de estadoPersona para comunicacion de componentes
14. Cambio estado desde Componente de baja al eliminar() y escucho por el cambio desde Listado mediante un Observable de $valorObservable
15. Escuchar en el Listado por cambio de Observable $valorObservable = this.estadoPersona... o mediante un Subscribe al $valorObservable para poder lanzar alerta con el valor del estadoCambiado y re cargar el Listado
16. En Alta HTML crear Formulario, seccion de Mostrar Rol y Direccion que contiene calle, nro, provincia, ciudad
17. En Alta Componente.ts importar FormGroup, FormBuilder (Constructor) y Validators, Router y Observable
18. Construir los Campos del Formulario en una variable Formulario, cargar los Selects haciendo llamada a $listado con | async
19. Asociar el Formulario HTML con los cammpos de la Variable formulario en el TS, con [formGroup] para el Formulario, formControlName para los campos y para las secciones formGroupName
20. Validar Formulario en tiempo real y al llamar la funcion de enviar(), utilizar el valueChanges.subscribe((valor) =>... para detectar cambios y mostrar secciones, o para llamar la API de ciudades si cambio el idProvincia
21. Desde el HTML validar el formulario mostrando alertas y carteles usando: formulario.touched && formulario.invalid dentro de un *ngIF, el Validator creado a mano (importarlo en el Componente TS para poder utilizarlo) y los valores ingresados mediante: formulario.get('idRol').touched && formulario.get('idRol').hasError('usuarioInvalido')
22. Acceder a datos del Formulario mediante: 
    - formulario.get('idRol')
    - formulario.controls['direccion'].get('idProvincia')
    - formulario.value.nombre
23. Control y muestra de Errores dentro del Formulario HTML
    - Direccion: {{formulario.value.direccion.calle}}
    - *ngIf="formulario.touched && formulario.invalid"
    - *ngIf="formulario.get('nombre')?.touched && formulario.get('nombre')?.hasError('required')"
    - *ngIf="formulario.get('idRol')?.touched && formulario.get('idRol')?.hasError('usuarioInvalido')"
24. Agregado de Validator Propio y Async, mostrando errores de la misma manera
    - Crear propio Validator normal -> ValidarRolUsuario
    - Para crear el Async Validator:
    - Agregar en PersonaService una consulta que devuelva un Observable<boolean> y busque el nombre existente.
    - Crear clase de PersonaValidator con una Funcion Static que se encargue de hacer la validacion contra la API
    - Agregar el Validator en la seccion de Validadores Asincronos del campo correspondiente
25. Crear funcion de enviar() donde validos que se cumplan los Validators del Formulario, en caso afirmativo enviamos el formulario mediante un subscription, luego de que se registro la transaccion redireccionamos al listado
26. Crear un Formulario para editar
27. En Componente TS de editar importar todos los modulos anteriores sumado ActivatedRoutes para poder tomar el id de la URL y definirlo en el Constructor
28. Cargar los datos consultados a la API dentro del Formulario en una funcion de cargarDatos() la cual crea la variable de formulario y carga lo obtenido de la API, la consulta de los datos se hace en el ngOnInit mediante un subscription el cual se destruye en el ngOnDestroy. Dentro del ngOnInit que se ejecuta cada vez que se crea el Componente luego de consultar la API, cargar los datos en el Formulario mediante la Funcion de cargarDatos() llamo a la funcion de cargar $ciudades para luego poder cambiar de Provincia y que se me carguen sus respectivas Ciudades
29. Utilizar para distintos Formatos las Pipes existentes - Crear Pipe personalizada e Importar en App Module
30. Usar directivas como [ngClass] - Crear directivas personalizadas e Importarlas en el App Module
31. Utilizar proyeccion de Contenido - Podria re-utilizarse el Formulario de Alta y Edicion

# Paso a Paso
1. Importar en App Modules -> HttpClientModule y ReactiveFormsModule
2. Crear cuatro componentes en /persona con `ng g c /persona/nombre-componente` (listado, alta, editar, baja)
3. Agregar en App Routing Module las rutas para los cuatro componentes: `{path: 'listado', component: ListadoComponent}, {path: '', redirecTo: 'listado', pathMatch: 'full'}`
4. Agregar Bootstrap en el index.html y crear un Navbar cuyos enlaces apunten a las rutas de los componentes con `routerLink="listado"`
5. Crear carpeta /services y crear un servicio con `ng g s /services/nombre-servicio` (personas) y agregarlo en el App Modules
6. Crear carpeta /models y crear una interfaz con `ng g interface /models/nombre-interfaz` (Persona) y agregarla en el App Modules
7. Crear Listado y cargar datos desde el servicio
>1) Copiar tabla de Bootstrap y pegar en el HTML del componente
>2) Crear /services/persona.service.ts y /services/rol.service.ts
>3) Crear /models/persona.ts y /models/rol.ts como Modelos
> persona.ts
```typescript
import { Rol } from './Rol'
import { Provincia } from './Provincia'
import { Ciudad } from './Ciudad'
export interface Persona {
  id: string,
  nombre: string,
  direccion: {
    idProvincia: string,
    provincia?: Provincia,
    idCiudad: string,
    ciudad?: Ciudad,
    calle: string,
    nro: number
  },
  rol?: Rol; // ? es para que sea opcional
  idRol: number; 
  idRol: string
}
```
> rol.ts
```typescript
export interface Rol {
    id: number;
    nombre: string;
}
```
>4) Dentro de personaService.ts y rolService.ts consultar API y devolver los datos en forma de Observable
```typescript
import { HttpClient } from '@angular/common/http'; // 1) Importar HttpClient
import { Observable } from 'rxjs'; // 2) Importar Observable
import { Persona } from '../models/Persona'; // 3) Importar Persona
import { Rol } from '../models/Rol'; // 4) Importar Rol
export class PersonaService {
  private url: string = 'http://localhost:3000/personas'; // 5) Crear variable url
  constructor(private http: HttpClient) { } // 6) Inyectar HttpClient en el constructor
  getPersonas(): Observable<Persona[]> { // 7) Crear método getPersonas que devuelva un Observable de Persona[]
    return this.http.get<Persona[]>(this.url); // 8) Devolver el resultado de la consulta a la API
  }
}
```
>5) Llamar al servicio desde el Componente y cargar los datos en la tabla usando | async en el *ngFor
```typescript
import { Component, OnInit } from '@angular/core'; // 1) Importar Component y OnInit
import { Observable, Subscription } from 'rxjs'; // 2) Importar Observable
import { PersonaService } from '../../services/persona.service'; // 3) Importar PersonaService
import { Persona } from '../../models/Persona'; // 4) Importar Persona
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  $personas: Observable<Persona[]>; // 5) Crear variable $personas de tipo Observable de Persona[]
  constructor(private personaService: PersonaService) { } // 6) Inyectar PersonaService en el constructor
  ngOnInit(): void {
    this.$personas = this.personaService.getPersonas(); // 7) Llamar al método getPersonas del servicio y cargar el resultado en la variable $personas
  }
```
-  1) Importar Models, Services, Router, Observable, Subscription y ngOnDestroy para .unsubscribe() en el ngOnDestroy() y evitar memory leaks
-  2) En Contructor del componente.ts definir private personaService:PersonaService, private router:Router, y demas servicios
- 3) Crear las variables de $listado, $oles de tipo Observable, y dentro del constructor inicialzar como this.$listado = new Observable<Persona[]>()
- 4) Crear el método ngOnInit() y dentro de este llamar al método del servicio que devuelve un Observable y cargar el resultado en la variable $listado
- 5) En ngOnInit() subscribirse al Observable y cargar el resultado en la variable listado mediante this.$listado = this.personaService.getPersonas() y en el subscribe cargar el resultado en la variable listado
- 6) En ngOnDestroy() desubscribirse del Observable mediante this.$listado.unsubscribe() para evitar memory leaks
- 7) Si no se da el caso de poder usar $listado, crear variable listado = [] y llenarle mediante Subscription.add() creando una variable private subscription: Subscription y dentro del constructor this.subscription = new Subscription(); y luego en el ngOnInit() this.subscription.add() donde llamemos al método del servicio que devuelve un Observable y cargar el resultado en la variable listado
> listado.component.ts
```typescript
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
```
- 8) En el HTML del componente usar *ngFor para recorrer la variable listado y mostrar los datos en la tabla; si tuvieramos $listado seria `*ngFor="let persona of $listado | async"` y si tuvieramos listado seria `*ngFor="let persona of listado"`.

>6) Crear en Servicios services/ estado-persona para Comunicación entre Componentes
- 1) Importar HttpClient, Observable y Subject de rxjs
- 2) En Constructor: private http: HttpClient
- 3) Crear variable private estadoSubject: Subject<string> e inicializar en constructor this.estadoSubject = new Subject<string>();
- 4) Crear Funcion de Cambiar Estado:
> estado-persona.service.ts
```typescript
cambiarEstado(estado:string) {
  this.estadoSubject.next(estado);
}
```
- 5) Crear Funcion de Estado Cambio:
> estado-persona.service.ts
```typescript
estadoCambio(): Observable<string> {
  return this.estadoSubject.asObservable();
}
```
- 6) Ejemplo de Utilizacion en Baja Persona:
En ListadoPersonas mando al Componente BajaPersona el ID para eliminar: `<app-baja-persona [id]="p.id"></app-baja-persona>`.

En Componente BajaPersona HTML un Boton que llame la funcion de eliminar(): `<button (click)="eliminar()">Eliminar</button>`.

En Componente BajaPersona TS: tomo @Input() id:string, inicializo en Constructor y llamao a Funcion eliminar():
> baja-persona.component.ts
```typescript
eliminar():void {
    const ok = confirm('Desea eliminar el usuario?');
    if(ok) {
      this.personaService.eliminar(this.id).subscribe({
        next: () => {
          this.estadoPersonaService.cambiarEstado(`Usuario Eliminado: ${this.id}`)
        },
        error: () => {
          this.estadoPersonaService.cambiarEstado(`Error al eliminar usuario: ${this.id}`)
        }
      })
    }
  }
```

En Componente ListadoPersonas TS: en Constructor (private estadoPersonaService: EstadoPersonaService), crear variable de tipo Observable $estadoObservable: Observable<string> y dentro de constructor inicializar como this.$estadoObservable = new Observable<string>(); y en ngOnInit() subscribirse al Observable y cargar el resultado en la variable estadoObservable mediante `this.$valorObservable = this.estadoPersonaService.estadoCambio();` y mostrar en HTML como `{{estadoObservable | async}}`

Para mostrar alerta desde ListadoComponente TS debemos subscribirnos al Observable:
> listado-personas.component.ts
```typescript
this.$valorObservable = this.estadoPersonaService.estadoCambio();
this.$valorObservable.subscribe({
  next: (valor:string) => {
    alert(valor)
    this.cargarListado();
  }
})
```

>
    7) Alta de Persona
- 1) En Componente HTML creo el Formulario con los campos necesarios
- 2) En Componente Alta.ts importar `{FormGroup, FormBuilder, Validators} from '@angular/forms';`
- 3) Crear variable de formulario: `formulario!: FormGroup;`
- 4) En Constructor: `constructor( private formBuilder:FormBuilder, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private rolService:RolService, private personaService:PersonaService, private router:Router )`
- 5) En ngOnInit() crear el formulario con los campos necesarios y sus validaciones:
> alta-persona.component.ts
```typescript
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
```
- 6) Para acceder a los valores del Formulario:
> alta-persona.component.ts
```typescript
this.formulario.controls['nombre'].value
this.formulario.controls['direccion'].get('calle').value
this.formulario.controls['direccion'].get('nro').value
this.formulario.value.nombre
this.formulario.value.direccion.calle
this.formulario.controls['tieneRol'].valueChanges.subscribe((valor) => {
  this.mostrarRol = valor
})

this.formulario.controls['direccion'].get('nro')?.valueChanges.subscribe((valor) => {
  console.log(valor)
})

this.formulario.controls['direccion'].get('idProvincia')?.valueChanges.subscribe((valor) => {
  this.$ciudades = this.ciudadService.obtener(valor);
})
```

- 7) Tomar - bindear datos del Formulario con los del HTML:
> alta-persona.component.html
```html
<form [formGroup]="formulario">
  <input type="email" class="form-control" id="nombre" formControlName="nombre">
   <select class="form-select" name="provincia" id="provincia" formControlName="idProvincia">
    <option [selected]="true" [disabled]="true" value="">--SELECCIONE--</option>
    <option [ngValue]="p.id" *ngFor="let p of $provincias | async">{{ p.nombre }}</option>
  </select>
  <input type="checkbox" class="form-check-input" id="tieneRol" formControlName="tieneRol">
  <div class="mb-3 form-check" *ngIf="mostrarRol">
    <label for="rol" class="form-label">Rol</label>
    <select class="form-select" name="rol" id="rol" formControlName="idRol">
      <option [selected]="true" [disabled]="true" value="">--SELECCIONE--</option>
      <option [ngValue]="r.id" *ngFor="let r of $roles | async">{{r.nombre}}</option>
    </select>
    <span *ngIf="formulario.get('idRol')?.touched && formulario.get('idRol')?.hasError('usuarioInvalido')">
      * Usuario no valido
    </span>
  </div>
  <p>
    <span>Nombre:</span> {{ formulario.value.nombre }}
  </p>
  <p>
    <span>Direccion:</span> {{ formulario.value.direccion.calle }}
    <span>Nro:</span> {{ formulario.value.direccion.nro }}
  </p>
  <p *ngIf="formulario.touched && formulario.invalid">
    El formulario es invalido
  </p>
  <button type="submit" class="btn btn-primary" (click)="alta()">Alta</button>
</form>
```
- 8) Enviar datos del Formulario al Servicio:
> alta-persona.component.ts
```typescript
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
```

- 9) Validar un campo del Formulario:
> alta-persona.component.ts
```typescript
this.formulario = this.formBuilder.group({
  nombre: ['', [
    Validators.required,
    Validators.minLength(3)
  ]],
  idRol: ['', [
    ValidarRolUusuario
  ]]
```

Podemos crear nuestro Propio Validator: ValidarRolUusuario
> alta-persona.component.ts
```typescript
import { AbstractControl } from "@angular/forms";
export function ValidarRolUusuario(control: AbstractControl) {
  if(control.value.includes("3")) {
    return {
      usuarioInvalido: true
    }
  }
  return null
}
```

Y dentro del HTML: 
> alta-persona.component.html
```html
<span *ngIf="formulario.get('idRol')?.touched && formulario.get('idRol')?.hasError('usuarioInvalido')">
  * Usuario no valido
</span>
```
  
 Podemos crear ASYNC VALIDATOR:
 
 Dentro del Service buscamos un Nombre que coincida:
 > persona.service.ts
 ```ts
  checkIfNameExists(value:string): Observable<boolean> {
    return this.http.get<Persona[]>(`${this.urlAPI}?nombre=${value}`).pipe(
      map((res:Persona[]) => {
        return res.length > 0;
      }
    ));
  }
  
  checkIfNameExists(value:string): Observable<boolean> {
    return this.http.get<Persona[]>(`${this.urlAPI}?nombre=${value}`).pipe(
      map(z => z.some((a) => a.nombre === value))
    );
  }
 ```
 
 Lleva la logica del Validator a importar en el Formulario:
 > PersonaValidator.ts
 ```ts
  import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
  import { Observable, map } from 'rxjs';
  import { PersonaService } from '../services/persona.service';

  export class PersonaValidator {
    static nombreValidator(personaService:PersonaService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return personaService
          .checkIfNameExists(control.value)
          .pipe(
            map((result: boolean) => {
              return result ? {nameAlreadyExists: result} : null;
            })
          )
      }
    }
  }
 ```
  
 Finalmente agregamos el Validator en el Formulario:
 > alta-persona.component.ts
 ```ts
  this.formulario = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
      ], [
        PersonaValidator.nombreValidator(this.personaService)
      ]],
      edad: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(120)
      ]]
 ```

>
    8) Editar una Persona:
- 1) Formulario igual al de Alta
- 2) De '@angular/route' obtener Router, ActivatedRoute
- 3) En ngOnInit() obtener el id de la Persona a editar mediante Subscription a ActivatedRoute.params para tomar (params) y de alli el ID para obtener dentro de ese Subscribe de next: (params) las $provincias, $roles, subscripcion al personaService para obtenerById(id) y dentro del next: (resPersona: Persona) asignar a this.persona = resPersona; para llenar formulario posteriormente en una funcion de cargarDatos() y consultar $ciudades teniendo el idProvincia.
> editar-persona.component.ts
```typescript
constructor(private formBuilder:FormBuilder, private personaService:PersonaService, private rolService:RolService, private provinciaService:ProvinciaService, private ciudadService:CiudadService, private router:Router, private activatedRoute:ActivatedRoute) { 
  this.subscription = new Subscription()
  this.$persona = new Observable<Persona>();
  this.$provincias = new Observable<Provincia[]>();
  this.$ciudades = new Observable<Ciudad[]>();
  this.$roles = new Observable<Rol[]>();
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
```
- 4) Enviar datos del Formulario al Servicio: igual que en Alta, verificando campos validos
> editar-persona.component.ts
```typescript
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
```

- 5) Para pasar el ID podemos usar el estado-persona.service para comunicacion entre componentes u obtener el ID del parametro de la URL mediante ActivatedRoutes creando como constante una id: string donde vamos a guardar el params['id'] y luego agregar al objeto persona el ID con this.persona.id = this.id

>
    9) Pipes - Pipes Personalizadas:
- 1) Crear Pipe Personalizado: ng g pipe pipes/esMayor
- 2) Crear funcion transform(): string
- 3) Importar Pipe en el modulo donde se va a usar
- 4) Usar Pipe en el HTML -> `<td>{{p.descuento | esMayor:16}}</td>`
> es-mayor.pipe.ts
```typescript
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: 'esMayor'
})
export class EsMayorPipe implements PipeTransform {
  private readonly LIMITE_POR_DEFECTO = 18;
  transform(value: number, limite: number = 18) {
    const resultado = value > limite ? 'Mayor de edad' : 'Menor de edad';
    return resultado;
  }
}
```
- 5) Usar pipes ya existentes como: | date:'dd/MM/yyyy' | uppercase | lowercase | currency:'ARS' | percent | number:'1.2-2' | json

>
    10) Directivas - Directivas Personalizadas:
- 1) Directiva `[ngClass]`:
> persona.component.html
```html
<p [ngClass]="{
  'rojo': ($listado | async)?.length == 0,
  'verde': ($listado | async)?.length
}">Cantidad de resultados: {{ ($listado | async)?.length }}</p>
```
- 2) Directiva `[ngStyle]`:
> persona.component.html
```html
<p [ngStyle]="{
  color: ($listado | async)?.length == 0 ? 'red' : 'green'
}">Cantidad de resultados: {{ ($listado | async)?.length }}</p>
```
- 3) Directiva `[ngSwitch]`:
> persona.component.html
```html
<div [ngSwitch]="'rojo'">
  <div *ngSwitchCase="'rojo'">ROJO</div>
  <div *ngSwitchCase="'verde'">VERDE</div>
</div>
```
- 4) Directiva `[ngFor]`:
> persona.component.html
```html
<div *ngFor="let p of $listado | async ">
  <p>{{p.nombre}}</p>
</div>
```
- 5) Directiva `[ngIf]`:
> persona.component.html
```html
<div *ngIf="($listado | async)?.length == 0">
  <p>No hay resultados</p>
</div>
```
- 6) Directiva `[ngIf]` con else:
> persona.component.html
```html
<div *ngIf="($listado | async)?.length == 0; else elseBlock">
  <p>No hay resultados</p>
</div>
<ng-template #elseBlock>
  <p>Hay resultados</p>
</ng-template>
```
- 7) Directivas Personalizadas: ng g directive directives/cambiarColor
> cambiar-color.directive.ts
```typescript
import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";
@Directive({
  selector: '[cambiarColor]'
})
export class CambiarColorDirective {
  private readonly colores = [
    'red',
    'blue',
    'green',
    'pink'
  ]
  constructor(private elemento:ElementRef) {}
  @HostListener('click')
  onClick() {
    // alert('Hice click')
    const colorIndex = Math.round(Math.random() * (this.colores.length - 1))
    this.elemento.nativeElement.style.color = this.colores[colorIndex]
  }
}
```
> persona.component.html
```html
<p cambiarColor>Texto con directiva personalizada</p>
```

>
    11) Proyeccion de Contenido: ng g component components/selectInyeccion
> select-inyeccion.component.html
```html
<p>HEADER</p>
<ng-content></ng-content>
<span>LUEGO DEL NG-CONTENT</span>
<ng-content select="[segundaSeccion]"></ng-content>
```
> persona.component.html
```html
<app-select-proyeccion>
  <select style="display: block;">
    <option value="">Hola</option>
    <option value="">Chau</option>
  </select>
  <input segundaSeccion type="text" name="" id="" value="Segunda Seccion" style="display: block;">
</app-select-proyeccion> 
```
