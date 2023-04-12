import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { NuevoAlumnoFormComponent } from './nuevo-alumno-form/nuevo-alumno-form.component';
import { EditAlumnoFormComponent } from './edit-alumno-form/edit-alumno-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAlumnosComponent,
  },
  {
    path: 'new-alumno',
    component: NuevoAlumnoFormComponent,
  },
  {
    path: 'edit/:id',
    component: EditAlumnoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
