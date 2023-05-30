import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/models';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'authentication';

export interface AuthState {
  currentUserLoaded: boolean;
  currentUser?: Usuario;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  currentUserLoaded: false,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.requestLogin, (state) => ({
    ...state,
    currentUserLoaded: false,
  })),
  on(AuthActions.currentUserObtained, (state, action) => ({
    ...state,
    currentUserLoaded: true,
    currentUser: action.usuario,
  })),
  on(AuthActions.loginFailed, (state) => ({
    ...state,
    currentUserLoaded: false,
    currentUser: undefined,
  })),
  on(AuthActions.logoutUser, (state) => ({
    ...state,
    currentUserLoaded: false,
    currentUser: undefined,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
