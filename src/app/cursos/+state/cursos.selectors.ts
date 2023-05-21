import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURSOS_FEATURE_KEY, CursosState } from './cursos.reducer';

export const cursosState =
  createFeatureSelector<CursosState>(CURSOS_FEATURE_KEY);

export const getCursosListLoaded = createSelector(
  cursosState,
  (state) => state.cursosListLoaded
);

export const getCursosList = createSelector(
  cursosState,
  (state) => state.listaCursos
);

export const getCurrentCursoLoaded = createSelector(
  cursosState,
  (state) => state.currentCursoLoaded
);

export const getCurrentCurso = createSelector(
  cursosState,
  (state) => state.currentCurso
);

export const getCurrentProfesor = createSelector(
  cursosState,
  (state) => state.currentProfesor
);
