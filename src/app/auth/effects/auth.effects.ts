import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, defer, Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import {
  LoginPageActions,
  AuthActions,
  AuthApiActions,
} from '@howl/auth/actions';
import { Credentials } from '@howl/auth/models/user';
import { AuthService } from '@howl/auth/services/auth.service';
import { LogoutConfirmationDialogComponent } from '@howl/auth/components/logout-confirmation-dialog.component';

@Injectable()
export class AuthEffects {
  @Effect()
  loadHabits$: Observable<any> = defer(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.user && user.user.token){
      return of(new AuthApiActions.LoginSuccess(user));
    }else{
      return of();
    }
  });
  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login), 
    map(action => action.payload.credentials),
    exhaustMap((auth: Credentials) =>
      this.authService.login(auth).pipe(
        map(user => new AuthApiActions.LoginSuccess({ user })),
        tap(user => {
          if(user && user.payload && user.payload.user){    
            localStorage.setItem('user',JSON.stringify(user.payload))
          }
        }),
        catchError(error =>
          of(new AuthApiActions.LoginFailure({ error: error.error.message }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthApiActions.AuthApiActionTypes.LoginRedirect,
      AuthActions.AuthActionTypes.Logout
    ),
    tap(() => localStorage.removeItem('user')),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LogoutConfirmation),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<
        LogoutConfirmationDialogComponent,
        undefined,
        boolean
      >(LogoutConfirmationDialogComponent);

      return dialogRef.afterClosed();
    }),
    map(
      result =>
        result
          ? new AuthActions.Logout()
          : new AuthActions.LogoutConfirmationDismiss()
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
