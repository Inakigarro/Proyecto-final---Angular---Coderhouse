import { Component, OnDestroy } from '@angular/core';
import { AlumnosService } from '../alumnos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/models';
import { Subject, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
})
export class DetalleAlumnoComponent implements OnDestroy {
  private destroy$ = new Subject();
  public currentAlumno$ = this.service.currentAlumno$;
  public inscripcionesDataSource = new MatTableDataSource<Curso>();
  public headers = ['nombre', 'profesor'];
  constructor(private service: AlumnosService) {
    this.currentAlumno$
      .pipe(
        filter((a) => !!a),
        tap((alumno) =>
          this.service
            .getInscripcionesByAlumno(alumno!.id)
            .pipe(
              map((ins) => {
                let cursosIds = ins.map((i) => i.cursoId);
                return this.service
                  .getCursosInscriptos(cursosIds)
                  .pipe(
                    map(
                      (cursos) => (this.inscripcionesDataSource.data = cursos)
                    )
                  )
                  .subscribe();
              })
            )
            .subscribe()
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
