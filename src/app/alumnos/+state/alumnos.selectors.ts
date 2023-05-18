import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ALUMNOS_FEATURE_KEY, AlumnosState } from './alumnos.reducer';
import { getRouterSelectors } from '@ngrx/router-store';

export const getAlumnosState =
  createFeatureSelector<AlumnosState>(ALUMNOS_FEATURE_KEY);

export const getAlumnoListLoaded = createSelector(
  getAlumnosState,
  (state) => state.alumnosListLoaded
);

export const getAlumnosList = createSelector(
  getAlumnosState,
  (state) => state.listaAlumnos
);

export const getCurrentAlumnoLoaded = createSelector(
  getAlumnosState,
  (state) => state.currentAlumnoLoaded
);

export const getCurrentAlumno = createSelector(
  getAlumnosState,
  (state) => state.currentAlumno
);
