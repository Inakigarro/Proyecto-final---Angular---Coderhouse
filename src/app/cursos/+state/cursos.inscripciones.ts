import { createActionGroup, props } from '@ngrx/store';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Edit curso button clicked': props<{ cursoId: number }>(),
    'Delete curso button clicked': props<{ cursoId: number }>(),
  },
});
