import { Action, createReducer, on } from '@ngrx/store';
import { Curso, Profesor } from 'src/app/models/models';
import { CursosActions } from './cursos.actions';
import { Statement } from '@angular/compiler';

export const CURSOS_FEATURE_KEY = 'cursos';

export interface CursosState {
  cursosListLoaded: boolean;
  listaCursos?: Curso[];
  currentCursoLoaded: boolean;
  currentCurso?: Curso;
  currentProfesor?: Profesor;
}

export interface CursosPartialState {
  readonly [CURSOS_FEATURE_KEY]: CursosState;
}

export const initialState: CursosState = {
  cursosListLoaded: false,
  currentCursoLoaded: false,
};

const reducer = createReducer(
  initialState,
  on(CursosActions.requestCursosList, (state) => ({
    ...state,
    cursosListLoaded: false,
  })),
  on(CursosActions.cursosListObtained, (state, action) => ({
    ...state,
    cursosListLoaded: true,
    listaCursos: action.cursosList,
  })),
  on(CursosActions.editCursoButtonClicked, (state) => ({
    ...state,
    currentCursoLoaded: false,
  })),
  on(CursosActions.currentCursoObtained, (state, action) => ({
    ...state,
    currentCursoLoaded: true,
    currentCurso: action.curso,
  })),
  on(CursosActions.editCursoFormSubmitionSucceed, (state, action) => ({
    ...state,
    currentCursoLoaded: false,
    currentCurso: undefined,
  }))
);

export function cursosReducer(state: CursosState | undefined, action: Action) {
  return reducer(state, action);
}
