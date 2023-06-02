import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { filter, map, switchMap, take, tap } from 'rxjs';

@Injectable()
export class AuthenticationEffects {
  public initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      switchMap(() =>
        this.service.verifyToken().pipe(
          filter((x) => !!x),
          take(1),
          map((usuario) =>
            AuthActions.requestLogin({
              loginId: usuario?.loginId as string,
              password: usuario?.password as string,
            })
          )
        )
      )
    )
  );
  public requestLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestLogin),
      switchMap((action) =>
        this.service.login(action.loginId, action.password).pipe(
          filter((x) => !!x),
          take(1),
          map((usuario) =>
            usuario?.password === action.password
              ? AuthActions.currentUserObtained({
                  usuario: usuario,
                })
              : AuthActions.loginFailed()
          )
        )
      )
    )
  );

  public userObtained$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.currentUserObtained),
        tap((action) => {
          localStorage.setItem('loginId', action.usuario.loginId);
          this.service.navigate(['alumnos'], false);
        })
      ),
    { dispatch: false }
  );

  public logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      tap(() => localStorage.removeItem('loginId')),
      map(() => AuthActions.userLoggedOut())
    )
  );

  public userLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.userLoggedOut),
        tap(() => this.service.navigate(['auth'], false))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: AuthenticationService
  ) {}
}
