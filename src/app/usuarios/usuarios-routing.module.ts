import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioFormComponent } from './nuevo-usuario-form/nuevo-usuario-form.component';
import { EditUsuarioFormComponent } from './edit-usuario-form/edit-usuario-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: '',
        component: ListaUsuariosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nuevo',
        component: NuevoUsuarioFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar',
        canActivate: [AuthGuard],
        children: [
          {
            path: ':usuarioId',
            component: EditUsuarioFormComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
