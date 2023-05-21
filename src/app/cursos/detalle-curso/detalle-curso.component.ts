import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, filter, map, tap } from 'rxjs';
import { CursosService } from '../cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno, Profesor } from 'src/app/models/models';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
})
export class DetalleCursoComponent implements OnDestroy {
  private destroy$ = new Subject();
  public headers = ['nombre', 'apellido', 'email'];
  public currentCurso$ = this.service.currentCurso$;
  public currentProfesor$: Observable<Profesor>;
  public inscripcionesDataSource = new MatTableDataSource<Alumno>();

  constructor(private service: CursosService) {
    this.currentCurso$
      .pipe(
        filter((c) => !!c),
        tap((curso) =>
          this.service
            .getInscripcionesByCursoId(curso!.id)
            .pipe(
              map((ins) => {
                let alumnosIds = ins.map((i) => i.alumnoId);
                return this.service
                  .getAlumnosInscriptos(alumnosIds)
                  .pipe(
                    map(
                      (alumnos) => (this.inscripcionesDataSource.data = alumnos)
                    )
                  )
                  .subscribe();
              })
            )
            .subscribe()
        ),
        tap(
          (curso) =>
            (this.currentProfesor$ = this.service.findProfesorById(
              curso!.profesorId
            ))
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public returnToList() {
    this.service.navigateToRoot();
  }
}
