import { Component, OnInit, Input } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoPersonaService } from 'src/app/services/estado-persona.service';

@Component({
  selector: 'app-baja-persona',
  templateUrl: './baja-persona.component.html',
  styleUrls: ['./baja-persona.component.css']
})
export class BajaPersonaComponent implements OnInit {

  @Input() id: string;
  constructor( private personaService:PersonaService, private estadoPersonaService:EstadoPersonaService) { 
    this.id = '';
  }

  ngOnInit(): void {
  }

  eliminar():void {
    const ok = confirm('Desea eliminar el usuario?');
    if(ok) {
      this.personaService.eliminar(this.id).subscribe({
        next: () => {
          // alert('Usuario eliminado correctamete')
          // cambiar estado de estadoPersona
          this.estadoPersonaService.cambiarEstado(`Usuario Eliminado: ${this.id}`)
        },
        error: () => {
          // alert('Error al eliminar el usuario')
          this.estadoPersonaService.cambiarEstado(`Error al eliminar usuario: ${this.id}`)
        }
      })
    }
  }
}
