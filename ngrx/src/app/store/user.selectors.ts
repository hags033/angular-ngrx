
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './user.reducer';

const usersSelector = createFeatureSelector<fromStore.UserState>(fromStore.userFeatureKey);

export const users = createSelector(usersSelector, fromStore.selectUsers);
