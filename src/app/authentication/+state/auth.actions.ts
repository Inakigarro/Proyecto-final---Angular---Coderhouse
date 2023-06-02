import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/models';

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Init Auth': emptyProps(),
    'Request Login': props<{ loginId: string; password: string }>(),
    'Current user obtained': props<{ usuario: Usuario }>(),
    'Login failed': emptyProps(),
    'Logout user': emptyProps(),
    'User Logged Out': emptyProps(),
  },
});
