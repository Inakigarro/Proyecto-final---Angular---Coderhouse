import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateUsuario, Usuario } from 'src/app/models/models';

export const UsuariosActions = createActionGroup({
  source: 'Usuarios',
  events: {
    'Request Usuarios list': emptyProps(),
    'Usuarios list obtained': props<{ usuariosList: Usuario[] }>(),
    'Create usuario form submitted': props<{ usuario: CreateUsuario }>(),
    'Create usuario form submition succeed': props<{ usuario: Usuario }>(),
    'Request current usuario': props<{ usuarioId: number }>(),
    'Current Usuario obtained': props<{ usuario: Usuario }>(),
    'Edit usuario form submitted': props<{ usuario: Usuario }>(),
    'Edit usuario form submition succeed': props<{ usuario: Usuario }>(),
    'Delete usuario button clicked': props<{ usuarioId: number }>(),
  },
});
