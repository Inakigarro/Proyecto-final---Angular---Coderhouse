import { Action, createReducer, on } from '@ngrx/store';
import { Alumno } from 'src/app/models/models';
import { AlumnosActions } from './alumnos.actions';

export const ALUMNOS_FEATURE_KEY = 'alumnos';

export interface AlumnosState {
  alumnosListLoaded: boolean;
  listaAlumnos?: Alumno[];
  currentAlumnoLoaded: boolean;
  currentAlumno?: Alumno;
}

export interface AlumnosPartialState {
  readonly [ALUMNOS_FEATURE_KEY]: AlumnosState;
}

export const initialState: AlumnosState = {
  alumnosListLoaded: false,
  currentAlumnoLoaded: false,
};

const reducer = createReducer(
  initialState,
  on(AlumnosActions.requestAlumnosList, (state) => ({
    ...state,
    alumnosListLoaded: false,
  })),
  on(AlumnosActions.alumnosListObtained, (state, action) => ({
    ...state,
    alumnosListLoaded: true,
    listaAlumnos: action.alumnosList,
  }))
);

export function alumnosReducer(
  state: AlumnosState | undefined,
  action: Action
) {
  return reducer(state, action);
}
