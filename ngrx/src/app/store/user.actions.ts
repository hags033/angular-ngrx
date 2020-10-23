import { createAction, props } from '@ngrx/store';

import { UserModel } from '../components/user-input/user-model';

export const addUser = createAction(
  '[User Store] Add User',
  props<{ user: UserModel }>()
);
