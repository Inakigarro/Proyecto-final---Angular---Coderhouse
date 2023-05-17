import { createActionGroup, props } from '@ngrx/store';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Edit inscripcion button clicked': props<{ inscripcionId: number }>(),
    'Delete inscripcion button clicked': props<{ inscripcionId: number }>(),
  },
});
