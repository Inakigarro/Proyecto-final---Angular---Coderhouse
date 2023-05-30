import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { LoginGuard } from './authentication/guards/login.guard';
import { AdminGuard } from './authentication/guards/admin.guard';
import { TitleTemplateStrategy } from './title-strategy';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [LoginGuard],
    title: 'Authentication',
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canActivate: [AuthGuard, AdminGuard],
    title: 'Usuarios',
  },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./alumnos/alumnos.module').then((m) => m.AlumnosModule),
    canActivate: [AuthGuard],
    title: 'Alumnos',
  },
  {
    path: 'profesores',
    loadChildren: () =>
      import('./profesores/profesores.module').then((m) => m.ProfesoresModule),
    canActivate: [AuthGuard],
    title: 'Profesores',
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then((m) => m.CursosModule),
    canActivate: [AuthGuard],
    title: 'Cursos',
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
    canActivate: [AuthGuard],
    title: 'Inscripciones',
  },
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TitleTemplateStrategy }],
})
export class AppRoutingModule {}
