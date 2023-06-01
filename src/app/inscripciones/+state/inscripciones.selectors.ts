import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INSCRIPCIONES_FEATURE_KEY,
  InscripcionesState,
} from './inscripciones.reducer';

export const getInscripcionesState = createFeatureSelector<InscripcionesState>(
  INSCRIPCIONES_FEATURE_KEY
);

export const getInscripcionesListLoaded = createSelector(
  getInscripcionesState,
  (state) => state.inscripcionesListLoaded
);

export const getInscripcionesList = createSelector(
  getInscripcionesState,
  (state) => state.inscripcionesList
);

export const getCurrentInscripcionLoaded = createSelector(
  getInscripcionesState,
  (state) => state.currentInscripcionLoaded
);

export const getCurrentInscripcion = createSelector(
  getInscripcionesState,
  (state) => state.currentInscripcion
);
