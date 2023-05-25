import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsuariosService } from '../usuarios.service';
import { RouterService } from 'src/app/router/router.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { UsuariosActions } from './usuarios.actions';

@Injectable()
export class UsuariosEffects {
  // Lista Usuarios.
  public requestUsuariosList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerUrl$.pipe(take(1))),
      filter((url) => url === '/usuarios'),
      map(() => UsuariosActions.requestUsuariosList())
    )
  );
  public usuarioListObtained$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.requestUsuariosList),
      switchMap(() => this.service.getUsuarios()),
      map((usuarios) =>
        UsuariosActions.usuariosListObtained({
          usuariosList: usuarios,
        })
      )
    )
  );

  public createUsuarioFormSubmitted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.createUsuarioFormSubmitted),
      switchMap((action) =>
        this.service.addUsuario(action.usuario).pipe(
          take(1),
          map((usuario) =>
            UsuariosActions.createUsuarioFormSubmitionSucceed({
              usuario: usuario,
            })
          )
        )
      )
    )
  );

  public navigateToUsuariosList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UsuariosActions.createUsuarioFormSubmitionSucceed,
          UsuariosActions.editUsuarioFormSubmitionSucceed
        ),
        tap(() => this.service.navigateToRoot())
      ),
    { dispatch: false }
  );

  public editUsuarioButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params['usuarioId']),
      map((params) =>
        UsuariosActions.requestCurrentUsuario({
          usuarioId: params['usuarioId'],
        })
      )
    )
  );

  public currentUsuarioObtained$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.requestCurrentUsuario),
      switchMap((action) => this.service.getUsuarioById(action.usuarioId)),
      filter((usuario) => !!usuario),
      map((usuario) =>
        UsuariosActions.currentUsuarioObtained({
          usuario: usuario,
        })
      )
    )
  );

  public editUsuarioFormSubmitted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.editUsuarioFormSubmitted),
      switchMap((action) => this.service.editUsuario(action.usuario)),
      filter((usuario) => !!usuario),
      map((usuario) =>
        UsuariosActions.editUsuarioFormSubmitionSucceed({
          usuario: usuario,
        })
      )
    )
  );

  public deleteUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.deleteUsuarioButtonClicked),
      switchMap((action) => this.service.deleteUsuarioById(action.usuarioId)),
      map(() => UsuariosActions.requestUsuariosList())
    )
  );
  constructor(
    private readonly actions$: Actions,
    private readonly service: UsuariosService,
    private readonly routerService: RouterService
  ) {}
}
