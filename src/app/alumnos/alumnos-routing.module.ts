import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { NuevoAlumnoFormComponent } from './nuevo-alumno-form/nuevo-alumno-form.component';
import { EditAlumnoFormComponent } from './edit-alumno-form/edit-alumno-form.component';
import { AlumnosComponent } from './alumnos.component';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent,
    children: [
      {
        path: '',
        component: ListaAlumnosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':alumnoId',
        component: DetalleAlumnoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nuevo',
        component: NuevoAlumnoFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:alumnoId',
        component: EditAlumnoFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
