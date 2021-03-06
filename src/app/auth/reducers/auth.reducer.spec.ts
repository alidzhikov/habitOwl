import { reducer } from '@howl/auth/reducers/auth.reducer';
import * as fromAuth from '@howl/auth/reducers/auth.reducer';
import { AuthApiActions, AuthActions } from '@howl/auth/actions/';

import { User } from '@howl/auth/models/user';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      /**
       * Snapshot tests are a quick way to validate
       * the state produced by a reducer since
       * its plain JavaScript object. These snapshots
       * are used to validate against the current state
       * if the functionality of the reducer ever changes.
       */
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should add a user set loggedIn to true in auth state', () => {
      const user = { email: 'test' } as User;
      const createAction = new AuthApiActions.LoginSuccess({ user });

      const expectedResult = {
        user: { name: 'test' },
      };

      const result = reducer(fromAuth.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGOUT', () => {
    it('should logout a user', () => {
      const initialState = {
        user: { email: 'test' },
      } as fromAuth.State;
      const createAction = new AuthActions.Logout();

      const expectedResult = fromAuth.initialState;

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });
});
