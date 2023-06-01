import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateProfesor, Curso, Profesor } from 'src/app/models/models';

export const ProfesoresActions = createActionGroup({
  source: 'Profesores',
  events: {
    'Request profesores list': emptyProps(),
    'Profesors list obtained': props<{ profesoresList: Profesor[] }>(),
    'Create Profesor form submitted': props<{ profesor: CreateProfesor }>(),
    'Create Profesor form submition succeed': props<{ profesor: Profesor }>(),
    'Request current profesor': props<{ profesorId: number }>(),
    'Current profesor obtained': props<{ profesor: Profesor }>(),
    'Edit profesor form submitted': props<{ profesor: Profesor }>(),
    'Edit profesor form submition succeed': props<{ profesor: Profesor }>(),
    'Delete profesor button clicked': props<{ profesorId: number }>(),
  },
});

export const DetalleProfesoresActions = createActionGroup({
  source: 'Detalle Profesor',
  events: {
    'Pedir cursos de profesor': props<{ profesorId: number }>(),
    'Cursos de profesor obtenidas': props<{ cursos: Curso[] }>(),
  },
});
