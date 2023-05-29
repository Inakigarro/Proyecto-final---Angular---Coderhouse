import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioFormComponent } from './nuevo-usuario-form/nuevo-usuario-form.component';
import { EditUsuarioFormComponent } from './edit-usuario-form/edit-usuario-form.component';
import { AdminGuard } from '../authentication/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: '',
        component: ListaUsuariosComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'nuevo',
        component: NuevoUsuarioFormComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'editar',
        canActivate: [AuthGuard, AdminGuard],
        children: [
          {
            path: ':usuarioId',
            component: EditUsuarioFormComponent,
            canActivate: [AuthGuard, AdminGuard],
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
