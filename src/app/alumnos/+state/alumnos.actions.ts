import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from 'src/app/models/models';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Request Alumnos list': emptyProps(),
    'Alumnos list obtained': props<{ alumnosList: Alumno[] }>(),
    'Edit alumno button clicked': props<{ alumnoId: number }>(),
    'Request current alumno': props<{ alumnoId: number }>(),
    'Current Alumno obtained': props<{ alumno: Alumno }>(),
    'Edit Alumno form submitted': props<{ alumno: Alumno }>(),
    'Edit alumno form submition succeed': props<{ alumno: Alumno }>(),
    'Edit alumno form submition failed': emptyProps(),
    'Delete alumno button clicked': props<{ alumnoId: number }>(),
  },
});
