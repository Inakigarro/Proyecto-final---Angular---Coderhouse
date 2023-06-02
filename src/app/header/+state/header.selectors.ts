import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HEADER_FEATURE_KEY, HeaderState } from './header.reducer';

export const getHeaderState =
  createFeatureSelector<HeaderState>(HEADER_FEATURE_KEY);

export const getCurrentTitle = createSelector(
  getHeaderState,
  (state) => state.currentTitle
);
