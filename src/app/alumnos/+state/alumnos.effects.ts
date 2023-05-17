import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlumnosActions } from './alumnos.actions';
import { filter, map, switchMap, take } from 'rxjs';
import { AlumnosService } from '../alumnos.service';

@Injectable()
export class AlumnosEffects {
  public requestAlumnosList$ = createEffect(() =>
    this.action$.pipe(
      ofType(AlumnosActions.requestAlumnosList),
      switchMap(() =>
        this.service.getAlumnos().pipe(
          filter((x) => !!x),
          take(1),
          map((result) =>
            AlumnosActions.alumnosListObtained({
              alumnosList: result,
            })
          )
        )
      )
    )
  );
  constructor(
    private readonly action$: Actions,
    private readonly service: AlumnosService
  ) {}
}
