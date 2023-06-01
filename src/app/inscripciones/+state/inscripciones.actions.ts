import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscripcion, Inscripcion } from 'src/app/models/models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Request Inscripciones list': emptyProps(),
    'Inscripciones list obtained': props<{ inscripciones: Inscripcion[] }>(),
    'Create inscripcion form submitted': props<{
      inscripcion: CreateInscripcion;
    }>(),
    'Create Inscripcion form submition succeed': props<{
      inscripcion: Inscripcion;
    }>(),
    'Inscripcion added to curso': emptyProps(),
    'Details inscripcion button clicked': props<{ inscripcionId: number }>(),
    'Request current inscripcion': props<{ inscripcionId: number }>(),
    'Current inscripcion obtained': props<{ inscripcion: Inscripcion }>(),
    'Edit inscripcion form submitted': props<{ inscripcion: Inscripcion }>(),
    'Edit inscripcion form submition succeed': props<{
      inscripcion: Inscripcion;
    }>(),
    'Delete inscripcion button clicked': props<{ inscripcionId: number }>(),
  },
});
