import { Action, createReducer, on } from '@ngrx/store';
import { Curso, Profesor } from 'src/app/models/models';
import {
  DetalleProfesoresActions,
  ProfesoresActions,
} from './profesores.actions';

export const PROFESORES_FEATURE_KEY = 'profesores';

export interface ProfesoresState {
  profesoresListLoaded: boolean;
  profesoresList?: Profesor[];
  currentProfesorLoaded: boolean;
  currentProfesor?: Profesor;
  currentProfesorCursosLoaded: boolean;
  currentProfesorCursos?: Curso[];
}

export interface ProfesoresPartialState {
  readonly [PROFESORES_FEATURE_KEY]: ProfesoresState;
}

export const initialState: ProfesoresState = {
  profesoresListLoaded: false,
  currentProfesorLoaded: false,
  currentProfesorCursosLoaded: false,
};

const reducer = createReducer(
  initialState,
  on(ProfesoresActions.requestProfesoresList, (state) => ({
    ...state,
    profesoresListLoaded: false,
    profesoresList: undefined,
  })),
  on(ProfesoresActions.profesorsListObtained, (state, action) => ({
    ...state,
    profesoresListLoaded: true,
    profesoresList: action.profesoresList,
  })),
  on(ProfesoresActions.requestCurrentProfesor, (state) => ({
    ...state,
    currentProfesorLoaded: false,
    currentProfesor: undefined,
  })),
  on(ProfesoresActions.currentProfesorObtained, (state, action) => ({
    ...state,
    currentProfesorLoaded: true,
    currentProfesor: action.profesor,
  })),
  on(DetalleProfesoresActions.pedirCursosDeProfesor, (state) => ({
    ...state,
    currentProfesorCursosLoaded: false,
    currentProfesorCursos: undefined,
  })),
  on(DetalleProfesoresActions.cursosDeProfesorObtenidas, (state, action) => ({
    ...state,
    currentProfesorCursosLoaded: true,
    currentProfesorCursos: action.cursos,
  }))
);

export function profesoresReducer(
  state: ProfesoresState | undefined,
  action: Action
) {
  return reducer(state, action);
}
