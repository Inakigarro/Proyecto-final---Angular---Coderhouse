import { createActionGroup, props } from '@ngrx/store';

export const ProfesoresActions = createActionGroup({
  source: 'Profesores',
  events: {
    'Edit profesor button clicked': props<{ profesorId: number }>(),
    'Delete profesor button clicked': props<{ profesorId: number }>(),
  },
});
