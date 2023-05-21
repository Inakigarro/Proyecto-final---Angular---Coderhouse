import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlumnosActions } from './alumnos.actions';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { AlumnosService } from '../alumnos.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { RouterService } from 'src/app/router/router.service';

@Injectable()
export class AlumnosEffects {
  // Lista Alumnos
  public requestAlumnosListFromNavigation$ = createEffect(() =>
    this.action$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerUrl$),
      filter((url) => url === '/alumnos'),
      switchMap(() => this.service.getAlumnos()),
      map((alumnos) =>
        AlumnosActions.alumnosListObtained({
          alumnosList: alumnos,
        })
      )
    )
  );

  // Crear alumnos
  public createAlumnoRequested$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.createAlumnoFormSubmitted),
      switchMap((action) =>
        this.service.addAlumno(action.alumno).pipe(
          take(1),
          map((alumno) => alumno)
        )
      ),
      map((alumno) =>
        AlumnosActions.createAlumnoFormSubmitionSucceed({
          alumno: alumno,
        })
      )
    )
  );

  // Editar Alumnos
  public requesCurrentAlumnoFromRouting$ = createEffect(() =>
    this.action$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params['alumnoId']),
      map((params) =>
        AlumnosActions.requestCurrentAlumno({
          alumnoId: params['alumnoId'] as number,
        })
      )
    )
  );

  public currentAlumnoObtained$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.requestCurrentAlumno),
      switchMap((action) =>
        this.service.findAlumnoById(action.alumnoId.toString()).pipe(
          filter((x) => !!x),
          take(1),
          map((result) =>
            AlumnosActions.currentAlumnoObtained({
              alumno: result,
            })
          )
        )
      )
    )
  );

  public editAlumnoFormSubmitted$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.editAlumnoFormSubmitted),
      switchMap((action) =>
        this.service.modifyAlumno(action.alumno).pipe(
          take(1),
          map((alumno) => alumno)
        )
      ),
      map((alumno) =>
        AlumnosActions.editAlumnoFormSubmitionSucceed({
          alumno: alumno,
        })
      )
    )
  );

  // Borrar alumno.
  public deleteAlumnoButtonClicked$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.deleteAlumnoButtonClicked),
      switchMap((action) =>
        this.service.deleteAlumnoById(action.alumnoId).pipe(
          take(1),
          map(() => AlumnosActions.requestAlumnosList())
        )
      )
    )
  );

  public alumnosList$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.requestAlumnosList),
      switchMap(() =>
        this.service.getAlumnos().pipe(
          take(1),
          map((alumnos) =>
            AlumnosActions.alumnosListObtained({
              alumnosList: alumnos,
            })
          )
        )
      )
    )
  );

  public navigateToAlumnosList$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          AlumnosActions.createAlumnoFormSubmitionSucceed,
          AlumnosActions.editAlumnoFormSubmitionSucceed
        ),
        tap(() => this.service.navigateToRoot())
      ),
    { dispatch: false }
  );

  // Detalles Alumnos.
  public viewMoreButtonClicked$ = createEffect(() =>
    this.action$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params && params['alumnoId']),
      map((params) =>
        AlumnosActions.requestCurrentAlumno({
          alumnoId: params['alumnoId'],
        })
      )
    )
  );

  constructor(
    private readonly action$: Actions,
    private readonly service: AlumnosService,
    private readonly routerService: RouterService
  ) {}
}
