import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfesoresService } from '../profesores.service';
import { RouterService } from 'src/app/router/router.service';
import { ProfesoresActions } from './profesores.actions';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Profesor } from 'src/app/models/models';
import { DetalleProfesoresActions } from './profesores.actions';

@Injectable()
export class ProfesoresEffects {
  public requestProfesoresList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfesoresActions.requestProfesoresList),
      switchMap(() =>
        this.service.getProfesores().pipe(
          filter((x) => !!x),
          take(1),
          map((profesores) =>
            ProfesoresActions.profesorsListObtained({
              profesoresList: profesores as Profesor[],
            })
          )
        )
      )
    )
  );

  public requestProfesoresListFromNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() =>
        this.routerService.routerUrl$.pipe(
          filter((x) => !!x),
          take(1)
        )
      ),
      filter((url) => url === '/profesores'),
      switchMap(() => this.service.getProfesores()),
      map((profesores) =>
        ProfesoresActions.profesorsListObtained({
          profesoresList: profesores,
        })
      )
    )
  );

  public navigateTolist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProfesoresActions.createProfesorFormSubmitionSucceed,
          ProfesoresActions.editProfesorFormSubmitionSucceed
        ),
        tap(() => this.service.navigateToRoot())
      ),
    { dispatch: false }
  );

  public createProfesorRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfesoresActions.createProfesorFormSubmitted),
      switchMap((action) =>
        this.service.addProfesor(action.profesor).pipe(
          filter((x) => !!x),
          take(1),
          map((profesor) =>
            ProfesoresActions.createProfesorFormSubmitionSucceed({
              profesor,
            })
          )
        )
      )
    )
  );

  public requestCurrentProfesor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params['profesorId']),
      map((params) =>
        ProfesoresActions.requestCurrentProfesor({
          profesorId: params['profesorId'],
        })
      )
    )
  );
  public currentProfesorObtained$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfesoresActions.requestCurrentProfesor),
      switchMap((action) =>
        this.service.findProfesorById(action.profesorId.toString()).pipe(
          filter((x) => !!x),
          take(1),
          map((profesor) =>
            ProfesoresActions.currentProfesorObtained({
              profesor,
            })
          )
        )
      )
    )
  );

  public editProfesorFormSubmitted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfesoresActions.editProfesorFormSubmitted),
      switchMap((action) =>
        this.service.modifyProfesor(action.profesor).pipe(
          filter((x) => !!x),
          take(1),
          map((profesor) =>
            ProfesoresActions.editProfesorFormSubmitionSucceed({
              profesor,
            })
          )
        )
      )
    )
  );

  public deleteProfesorButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfesoresActions.deleteProfesorButtonClicked),
      switchMap((action) =>
        this.service.deleteProfesorById(action.profesorId).pipe(
          filter((x) => !!x),
          take(1),
          map(() => ProfesoresActions.requestProfesoresList())
        )
      )
    )
  );

  public viewMoreButtonClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$),
      filter((params) => !!params['profesorId']),
      map((params) =>
        ProfesoresActions.requestCurrentProfesor({
          profesorId: params['profesorId'],
        })
      )
    )
  );

  public requestCursosProfesor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfesoresActions.currentProfesorObtained),
      map((action) =>
        DetalleProfesoresActions.pedirCursosDeProfesor({
          profesorId: action.profesor.id,
        })
      )
    )
  );

  public profesorCursosObtained$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DetalleProfesoresActions.pedirCursosDeProfesor),
      switchMap((action) =>
        this.service.getCursosProfesor(action.profesorId).pipe(
          filter((x) => !!x),
          take(1),
          map((cursos) =>
            DetalleProfesoresActions.cursosDeProfesorObtenidas({
              cursos: cursos,
            })
          )
        )
      )
    )
  );
  constructor(
    private readonly actions$: Actions,
    private readonly service: ProfesoresService,
    private readonly routerService: RouterService
  ) {}
}
