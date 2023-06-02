import { Action, createReducer, on } from '@ngrx/store';
import { updateTitle } from './header.actions';

export const HEADER_FEATURE_KEY = 'header';

export interface HeaderState {
  currentTitle: string;
}

export interface HeaderPartialState {
  readonly [HEADER_FEATURE_KEY]: HeaderState;
}

export const initialState: HeaderState = {
  currentTitle: '',
};

const reducer = createReducer(
  initialState,
  on(updateTitle, (state, action) => ({
    ...state,
    currentTitle: action.title,
  }))
);

export function headerReducer(state: HeaderState | undefined, action: Action) {
  return reducer(state, action);
}
