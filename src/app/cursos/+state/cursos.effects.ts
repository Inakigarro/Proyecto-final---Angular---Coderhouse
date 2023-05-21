import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs';
import { CursosService } from '../cursos.service';
import { RouterService } from 'src/app/router/router.service';
import { CursosActions } from './cursos.actions';

@Injectable()
export class CursosEffects {
  public requestCursosListFromNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerUrl$),
      filter((url) => url === '/cursos'),
      switchMap(() => this.service.cursos$),
      map((cursos) =>
        CursosActions.cursosListObtained({
          cursosList: cursos,
        })
      )
    )
  );

  public currentCursoObtained$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.requestCurrentCurso),
      switchMap((action) =>
        this.service.findCursoById(action.cursoId.toString()).pipe(
          filter((x) => !!x),
          take(1),
          map((curso) =>
            CursosActions.currentCursoObtained({
              curso: curso,
            })
          )
        )
      )
    )
  );

  public viewMoreButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params && params['cursoId']),
      map((params) =>
        CursosActions.requestCurrentCurso({
          cursoId: params['cursoId'],
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: CursosService,
    private routerService: RouterService
  ) {}
}
