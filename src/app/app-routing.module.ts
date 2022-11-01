import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaPersonaComponent } from './persona/alta-persona/alta-persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';

import { ListadoPersonaComponent } from './persona/listado-persona/listado-persona.component';

const routes: Routes = [
  {path: 'listado', component: ListadoPersonaComponent},
  {path: '', redirectTo: 'listado', pathMatch: 'full'},
  {path: 'alta', component: AltaPersonaComponent},
  {path: 'editar/:id', component: EditarPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
