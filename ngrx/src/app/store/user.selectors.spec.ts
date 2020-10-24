import { users } from './user.selectors';

describe('My Selectors', () => {
  it('should get initial user', () => {
    const USERS = [{ name: 'Alex', friends: '', age: 23, weight: 235 }];
    expect(users.projector({ users: USERS })).toEqual(USERS);
  });
});
