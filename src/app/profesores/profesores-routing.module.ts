import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProfesoresComponent } from './lista-profesores/lista-profesores.component';
import { ProfesoresComponent } from './profesores.component';
import { NuevoProfesorFormComponent } from './nuevo-profesor-form/nuevo-profesor-form.component';
import { EditProfesorFormComponent } from './edit-profesor-form/edit-profesor-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProfesoresComponent,
    children: [
      {
        path: '',
        component: ListaProfesoresComponent,
      },
      {
        path: 'nuevo',
        component: NuevoProfesorFormComponent,
      },
      {
        path: 'editar/:id',
        component: EditProfesorFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresRoutingModule {}
