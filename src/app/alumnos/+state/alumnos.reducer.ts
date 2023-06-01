import { Action, createReducer, on } from '@ngrx/store';
import { Alumno, Curso } from 'src/app/models/models';
import { AlumnosActions, DetalleAlumnoActions } from './alumnos.actions';

export const ALUMNOS_FEATURE_KEY = 'alumnos';

export interface AlumnosState {
  alumnosListLoaded: boolean;
  listaAlumnos?: Alumno[];
  currentAlumnoLoaded: boolean;
  currentAlumno?: Alumno;
  currentAlumnoInscripcionesLoaded: boolean;
  currentAlumnoInscripciones?: Curso[];
}

export interface AlumnosPartialState {
  readonly [ALUMNOS_FEATURE_KEY]: AlumnosState;
}

export const initialState: AlumnosState = {
  alumnosListLoaded: false,
  currentAlumnoLoaded: false,
  currentAlumnoInscripcionesLoaded: false,
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
  })),
  on(AlumnosActions.requestCurrentAlumno, (state) => ({
    ...state,
    currentAlumnoLoaded: false,
    currentAlumnoInscripcionesLoaded: false,
    currentAlumno: undefined,
    currentAlumnoInscripciones: undefined,
  })),
  on(AlumnosActions.currentAlumnoObtained, (state, action) => ({
    ...state,
    currentAlumnoLoaded: true,
    currentAlumno: action.alumno,
  })),
  on(AlumnosActions.editAlumnoFormSubmitted, (state, action) => ({
    ...state,
    currentAlumnoLoaded: false,
    currentAlumno: undefined,
  })),
  on(AlumnosActions.editAlumnoFormSubmitionSucceed, (state, action) => ({
    ...state,
    currentAlumno: action.alumno,
  })),
  on(DetalleAlumnoActions.inscripcionesDeAlumnoObtenidas, (state, action) => ({
    ...state,
    currentAlumnoInscripcionesLoaded: true,
    currentAlumnoInscripciones: action.cursos,
  }))
);

export function alumnosReducer(
  state: AlumnosState | undefined,
  action: Action
) {
  return reducer(state, action);
}
