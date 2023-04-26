import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { NuevoCursoFormComponent } from './nuevo-curso-form/nuevo-curso-form.component';
import { EditarCursoFormComponent } from './editar-curso-form/editar-curso-form.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
    children: [
      {
        path: '',
        component: ListaCursosComponent,
      },
      {
        path: 'nuevo',
        component: NuevoCursoFormComponent,
      },
      {
        path: 'editar/:id',
        component: EditarCursoFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
