import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlumnosActions, DetalleAlumnoActions } from './alumnos.actions';
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
      switchMap(() => this.routerService.routerUrl$.pipe(take(1))),
      filter((url) => url === '/alumnos'),
      switchMap(() => this.service.getAlumnos()),
      map((alumnos) =>
        AlumnosActions.alumnosListObtained({
          alumnosList: alumnos,
        })
      )
    )
  );

  public alumnosList$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.requestAlumnosList),
      switchMap(() =>
        this.service.getAlumnos().pipe(
          filter((x) => !!x),
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

  // Detalles Alumnos.
  public viewMoreButtonClicked$ = createEffect(() =>
    this.action$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerParams$.pipe(take(1))),
      filter((params) => !!params['alumnoId']),
      map((params) =>
        AlumnosActions.requestCurrentAlumno({
          alumnoId: params['alumnoId'],
        })
      )
    )
  );

  public requestInscripcionesAlumnos$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.currentAlumnoObtained),
      map((action) =>
        DetalleAlumnoActions.pedirInscripcionesDeAlumno({
          alumnoId: action.alumno.id,
        })
      )
    )
  );

  public unsubscribeAlumnoButtonClicked$ = createEffect(() =>
    this.action$.pipe(
      ofType(DetalleAlumnoActions.desinscribirAlumnoDelCurso),
      switchMap((action) =>
        this.service
          .getInscripcionByAlumnoAndCurso(action.alumnoId, action.cursoId)
          .pipe(
            filter((x) => !!x),
            take(1),
            switchMap((inscripcion) =>
              this.service
                .deleteInscripcionById(inscripcion?.id as number)
                .pipe(
                  take(1),
                  map((ins) =>
                    DetalleAlumnoActions.alumnoDesinscriptoCorrectamente({
                      alumnoId: ins.alumnoId,
                    })
                  )
                )
            )
          )
      )
    )
  );

  public reloadCurrentAlumnoInscripciones$ = createEffect(() =>
    this.action$.pipe(
      ofType(DetalleAlumnoActions.alumnoDesinscriptoCorrectamente),
      map((action) =>
        DetalleAlumnoActions.pedirInscripcionesDeAlumno({
          alumnoId: action.alumnoId,
        })
      )
    )
  );

  public requestInscripcionesalumno$ = createEffect(() =>
    this.action$.pipe(
      ofType(DetalleAlumnoActions.pedirInscripcionesDeAlumno),
      switchMap((action) =>
        this.service.getInscripcionesByAlumno(action.alumnoId).pipe(
          filter((x) => !!x),
          take(1),
          switchMap((ins) => {
            let cursosIds = ins.map((i) => i.cursoId);
            return this.service.getCursosInscriptos(cursosIds).pipe(
              filter((x) => !!x),
              take(1),
              map((cursos) =>
                DetalleAlumnoActions.inscripcionesDeAlumnoObtenidas({
                  cursos: cursos,
                })
              )
            );
          })
        )
      )
    )
  );
  constructor(
    private readonly action$: Actions,
    private readonly service: AlumnosService,
    private readonly routerService: RouterService
  ) {}
}
