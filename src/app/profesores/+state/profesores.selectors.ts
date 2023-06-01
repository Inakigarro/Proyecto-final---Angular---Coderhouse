import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROFESORES_FEATURE_KEY, ProfesoresState } from './profesores.reducer';

export const getProfesoresState = createFeatureSelector<ProfesoresState>(
  PROFESORES_FEATURE_KEY
);

export const getProfesoresList = createSelector(
  getProfesoresState,
  (state) => state.profesoresList
);

export const getProfestoresListLoaded = createSelector(
  getProfesoresState,
  (state) => state.profesoresListLoaded
);

export const getCurrentProfesor = createSelector(
  getProfesoresState,
  (state) => state.currentProfesor
);

export const getCurrentProfesorLoaded = createSelector(
  getProfesoresState,
  (state) => state.currentProfesorLoaded
);

export const getCurrentProfesorCursosLoaded = createSelector(
  getProfesoresState,
  (state) => state.currentProfesorCursosLoaded
);

export const getCurrentProfesorCursos = createSelector(
  getProfesoresState,
  (state) => state.currentProfesorCursos
);
