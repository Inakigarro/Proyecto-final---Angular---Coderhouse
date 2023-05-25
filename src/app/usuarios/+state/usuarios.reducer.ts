import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/models';
import { UsuariosActions } from './usuarios.actions';

export const USUARIOS_FEATURE_KEY = 'usuarios';

export interface UsuariosState {
  usuariosListLoaded: boolean;
  usuariosList?: Usuario[];
  currentUsuarioLoaded: boolean;
  currentUsuario?: Usuario;
}

export interface UsuariosPartialState {
  readonly [USUARIOS_FEATURE_KEY]: UsuariosState;
}

export const initialState: UsuariosState = {
  currentUsuarioLoaded: false,
  usuariosListLoaded: false,
};

const reducer = createReducer(
  initialState,
  on(UsuariosActions.requestUsuariosList, (state) => ({
    ...state,
    usuariosListLoaded: false,
  })),
  on(UsuariosActions.usuariosListObtained, (state, action) => ({
    ...state,
    usuariosListLoaded: true,
    usuariosList: action.usuariosList,
  })),
  on(UsuariosActions.requestCurrentUsuario, (state) => ({
    ...state,
    currentUsuarioLoaded: false,
    currentUsuario: undefined,
  })),
  on(UsuariosActions.currentUsuarioObtained, (state, action) => ({
    ...state,
    currentUsuario: action.usuario,
    currentUsuarioLoaded: true,
  }))
);

export function usuariosReducer(
  state: UsuariosState | undefined,
  action: Action
) {
  return reducer(state, action);
}
