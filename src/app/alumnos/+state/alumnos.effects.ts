import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlumnosActions } from './alumnos.actions';
import {
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AlumnosService } from '../alumnos.service';
import {
  ROUTER_NAVIGATED,
  getRouterSelectors,
  routerNavigatedAction,
} from '@ngrx/router-store';
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

  // Editar Alumnos
  public requesCurrentAlumnoFromRouting$ = createEffect(() =>
    this.action$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params && params['alumnoId']),
      map((params) => {
        console.log(params['alumnoId']);

        return AlumnosActions.requestCurrentAlumno({
          alumnoId: params['alumnoId'] as number,
        });
      })
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

  public navigateToAlumnosList$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AlumnosActions.editAlumnoFormSubmitionSucceed),
        tap(() => this.service.navigateToRoot())
      ),
    { dispatch: false }
  );
  constructor(
    private readonly action$: Actions,
    private readonly service: AlumnosService,
    private readonly routerService: RouterService
  ) {}
}
