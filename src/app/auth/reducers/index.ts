import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";
import * as fromRoot from "@howl/reducers";
import * as fromAuth from "@howl/auth/reducers/auth.reducer";
import * as fromLoginPage from "@howl/auth/reducers/login-page.reducer";
import { AuthApiActions } from "@howl/auth/actions";

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<
  AuthState,
  AuthApiActions.AuthApiActionsUnion
> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>("auth");

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
export const getLoggedIn = createSelector(
  getUser,
  user => !!user
);
export const getToken = createSelector(
  getUser,
  user => (user ? user.token : undefined)
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
