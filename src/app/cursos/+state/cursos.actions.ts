import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateCurso, Curso, Profesor } from 'src/app/models/models';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Request Cursos List': emptyProps(),
    'Cursos list obtained': props<{ cursosList: Curso[] }>(),
    'Create curso form submitted': props<{ curso: CreateCurso }>(),
    'Create curso form submition succeed': props<{ curso: Curso }>(),
    'Edit curso button clicked': props<{ cursoId: number }>(),
    'Request current curso': props<{ cursoId: number }>(),
    'Current curso obtained': props<{ curso: Curso }>(),
    'Edit curso form submitted': props<{ curso: Curso }>(),
    'Edit curso form submition succeed': props<{ curso: Curso }>(),
    'Delete curso button clicked': props<{ cursoId: number }>(),
  },
});
