import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { CursosService } from '../cursos.service';
import { RouterService } from 'src/app/router/router.service';
import { CursosActions } from './cursos.actions';

@Injectable()
export class CursosEffects {
  // Lista cursos.
  public requestCursosListFromNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerUrl$.pipe(take(1))),
      filter((url) => url === '/cursos'),
      switchMap(() => this.service.cursos$),
      map((cursos) =>
        CursosActions.cursosListObtained({
          cursosList: cursos,
        })
      )
    )
  );

  public cursosList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.requestCursosList),
      switchMap(() =>
        this.service.cursos$.pipe(
          take(1),
          map((cursos) =>
            CursosActions.cursosListObtained({
              cursosList: cursos,
            })
          )
        )
      )
    )
  );

  public navigateToCursosList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CursosActions.createCursoFormSubmitionSucceed,
          CursosActions.editCursoFormSubmitionSucceed
        ),
        tap(() => this.service.navigateToRoot())
      ),
    { dispatch: false }
  );

  public createAlumnoRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.createCursoFormSubmitted),
      switchMap((action) =>
        this.service.addCurso(action.curso).pipe(
          take(1),
          map((curso) => curso)
        )
      ),
      map((curso) =>
        CursosActions.createCursoFormSubmitionSucceed({
          curso: curso,
        })
      )
    )
  );

  // Editar curso.
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

  public editCursoFormSubmitted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.editCursoFormSubmitted),
      switchMap((action) =>
        this.service.modifyCurso(action.curso).pipe(
          take(1),
          map((curso) => curso)
        )
      ),
      map((curso) =>
        CursosActions.editCursoFormSubmitionSucceed({
          curso: curso,
        })
      )
    )
  );

  // Borrar curso.
  public deleteCursoButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.deleteCursoButtonClicked),
      switchMap((action) =>
        this.service.deleteCursoById(action.cursoId).pipe(
          take(1),
          map(() => CursosActions.requestCursosList())
        )
      )
    )
  );

  // Detalles cursos.
  public viewMoreButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$.pipe(take(1))),
      filter((params) => !!params['cursoId']),
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
