import { Action, createReducer, on } from '@ngrx/store';
import { Inscripcion } from 'src/app/models/models';
import { InscripcionesActions } from './inscripciones.actions';
import { Statement } from '@angular/compiler';

export const INSCRIPCIONES_FEATURE_KEY = 'inscripciones';

export interface InscripcionesState {
  inscripcionesListLoaded: boolean;
  inscripcionesList?: Inscripcion[];
  currentInscripcionLoaded: boolean;
  currentInscripcion?: Inscripcion;
}

export interface InscripcionesPartialState {
  readonly [INSCRIPCIONES_FEATURE_KEY]: InscripcionesState;
}

export const initialState: InscripcionesState = {
  inscripcionesListLoaded: false,
  currentInscripcionLoaded: false,
};

const reducer = createReducer(
  initialState,
  on(InscripcionesActions.requestInscripcionesList, (state) => ({
    ...state,
    inscripcionesListLoaded: false,
    inscripcionesList: undefined,
  })),
  on(InscripcionesActions.inscripcionesListObtained, (state, action) => ({
    ...state,
    inscripcionesListLoaded: true,
    inscripcionesList: action.inscripciones,
  })),
  on(InscripcionesActions.requestCurrentInscripcion, (state) => ({
    ...state,
    currentInscripcionLoaded: false,
    currentInscripcion: undefined,
  })),
  on(InscripcionesActions.currentInscripcionObtained, (state, action) => ({
    ...state,
    currentInscripcionLoaded: true,
    currentInscripcion: action.inscripcion,
  }))
);

export function inscripcionesReducer(
  state: InscripcionesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
