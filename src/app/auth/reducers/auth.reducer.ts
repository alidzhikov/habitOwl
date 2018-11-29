import { AuthApiActions, AuthActions } from '@howl/auth/actions';
import { User } from '@howl/auth/models/user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  //user: localStorage.getItem('userDetails'),
};

export function reducer(
  state = initialState,
  action: AuthApiActions.AuthApiActionsUnion | AuthActions.AuthActionsUnion
): State {
  switch (action.type) {
    case AuthApiActions.AuthApiActionTypes.LoginSuccess: {
      localStorage.setItem('userDetails', JSON.stringify({name: action.payload.user.email, token: action.payload.user.token}));
      return {
        ...state,
        user: action.payload.user,
      };
    }

    case AuthActions.AuthActionTypes.Logout: {
      localStorage.removeItem('userDetails');
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
