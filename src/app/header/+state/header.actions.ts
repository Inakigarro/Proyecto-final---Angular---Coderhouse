import { createAction, props } from '@ngrx/store';

export const updateTitle = createAction(
  '[Header] Update Current Title',
  props<{ title: string }>()
);
