import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { NuevoCursoFormComponent } from './nuevo-curso-form/nuevo-curso-form.component';
import { EditarCursoFormComponent } from './editar-curso-form/editar-curso-form.component';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { DetalleAlumnoComponent } from '../alumnos/detalle-alumno/detalle-alumno.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
    children: [
      {
        path: '',
        component: ListaCursosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':cursoId',
        component: DetalleCursoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nuevo',
        component: NuevoCursoFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:cursoId',
        component: EditarCursoFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
