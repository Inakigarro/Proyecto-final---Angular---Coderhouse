import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USUARIOS_FEATURE_KEY, UsuariosState } from './usuarios.reducer';

export const getUsuariosState =
  createFeatureSelector<UsuariosState>(USUARIOS_FEATURE_KEY);

export const getUsuariosListLoaded = createSelector(
  getUsuariosState,
  (state) => state.usuariosListLoaded
);

export const getUsuariosList = createSelector(
  getUsuariosState,
  (state) => state.usuariosList
);

export const getCurrentUsuarioLoaded = createSelector(
  getUsuariosState,
  (state) => state.currentUsuarioLoaded
);

export const getCurrentUsuario = createSelector(
  getUsuariosState,
  (state) => state.currentUsuario
);
