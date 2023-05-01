import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesComponent } from './inscripciones.component';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';
import { InscripcionDetallesComponent } from './inscripcion-detalles/inscripcion-detalles.component';
import { NuevaInscripcionFormComponent } from './nueva-inscripcion-form/nueva-inscripcion-form.component';

const routes: Routes = [
  {
    path: '',
    component: InscripcionesComponent,
    children: [
      {
        path: '',
        component: ListaInscripcionesComponent,
      },
      {
        path: 'nueva',
        component: NuevaInscripcionFormComponent,
      },
      {
        path: 'detalles/:id',
        component: InscripcionDetallesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
