import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../components/user-input/user-model';
import { addUser } from './user.actions';

export const userFeatureKey = 'users';

export interface UserState {
  users: Array<UserModel>;
}


export const initialState: UserState = {
  users: [{
    name: 'Jim',
    friends: 'none',
    age: 45,
    weight: 165
  }]
};

export const reducer = createReducer(
  initialState,
  on(addUser,
    (state, action) => {
      return { ...state,
        users:   [...state.users, action.user]
      };
    }

  )
);

export const selectUsers = (state: UserState) => state.users;
