import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProfesoresComponent } from './lista-profesores/lista-profesores.component';
import { ProfesoresComponent } from './profesores.component';
import { NuevoProfesorFormComponent } from './nuevo-profesor-form/nuevo-profesor-form.component';
import { EditProfesorFormComponent } from './edit-profesor-form/edit-profesor-form.component';
import { AuthGuard } from '../authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfesoresComponent,
    children: [
      {
        path: '',
        component: ListaProfesoresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nuevo',
        component: NuevoProfesorFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: EditProfesorFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresRoutingModule {}
