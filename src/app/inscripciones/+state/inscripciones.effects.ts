import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InscripcionesService } from '../inscripciones.service';
import { RouterService } from 'src/app/router/router.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from 'src/app/models/models';
import { AlumnosActions } from 'src/app/alumnos/+state/alumnos.actions';

@Injectable()
export class InscripcionesEffects {
  public requestInscripcionesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerUrl$.pipe(take(1))),
      filter((url) => url === '/inscripciones'),
      switchMap(() => this.service.getInscripciones()),
      map((inscripciones) =>
        InscripcionesActions.inscripcionesListObtained({
          inscripciones: inscripciones as Inscripcion[],
        })
      )
    )
  );

  public inscripcionesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.requestInscripcionesList),
      switchMap(() =>
        this.service.getInscripciones().pipe(
          take(1),
          map((ins) =>
            InscripcionesActions.inscripcionesListObtained({
              inscripciones: ins,
            })
          )
        )
      )
    )
  );

  public navigateToInscripcionesList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          InscripcionesActions.createInscripcionFormSubmitionSucceed,
          InscripcionesActions.editInscripcionFormSubmitionSucceed
        ),
        tap(() => this.service.navigateToRoot())
      ),
    { dispatch: false }
  );

  public createInscripcionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.createInscripcionFormSubmitted),
      switchMap((action) =>
        this.service.addInscripcion(action.inscripcion).pipe(
          filter((i) => !!i),
          take(1),
          map((inscripcion) =>
            InscripcionesActions.createInscripcionFormSubmitionSucceed({
              inscripcion,
            })
          )
        )
      )
    )
  );

  public addInscripcionToCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.createInscripcionFormSubmitionSucceed),
      switchMap((action) =>
        this.service.findCursoById(action.inscripcion.cursoId).pipe(
          filter((x) => !!x),
          take(1),
          tap((curso) => curso.inscripciones.push(action.inscripcion.id)),
          switchMap((curso) =>
            this.service.updateCurso(curso).pipe(
              filter((x) => !!x),
              take(1),
              map(() => InscripcionesActions.inscripcionAddedToCurso())
            )
          )
        )
      )
    )
  );

  public currentInscripcionObtained$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.requestCurrentInscripcion),
      switchMap((action) =>
        this.service.findInscripcionById(action.inscripcionId.toString()).pipe(
          filter((x) => !!x),
          take(1),
          map((inscripcion) =>
            InscripcionesActions.currentInscripcionObtained({
              inscripcion: inscripcion,
            })
          )
        )
      )
    )
  );

  public detailsInscripcionesRequested = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.detailsInscripcionButtonClicked),
      map((action) =>
        InscripcionesActions.requestCurrentInscripcion({
          inscripcionId: action.inscripcionId,
        })
      )
    )
  );

  public detailsInscripcionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params['inscripcionId']),
      map((params) =>
        InscripcionesActions.requestCurrentInscripcion({
          inscripcionId: params['inscripcionId'],
        })
      )
    )
  );

  public deleteInscripcionButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscripcionButtonClicked),
      switchMap((action) =>
        this.service.deleteInscripcionById(action.inscripcionId).pipe(
          filter((x) => !!x),
          take(1),
          map(() => InscripcionesActions.requestInscripcionesList())
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: InscripcionesService,
    private readonly routerService: RouterService
  ) {}
}
