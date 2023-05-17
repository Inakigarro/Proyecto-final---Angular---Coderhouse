import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from 'src/app/models/models';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Request Alumnos list': emptyProps(),
    'Alumnos list obtained': props<{ alumnosList: Alumno[] }>(),
    'Edit alumno button clicked': props<{ alumnoId: number }>(),
    'Delete alumno button clicked': props<{ alumnoId: number }>(),
  },
});
