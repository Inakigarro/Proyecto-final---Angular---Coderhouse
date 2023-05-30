import { Component, OnDestroy } from '@angular/core';
import { AlumnosService } from '../alumnos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/models';
import { Subject, filter, map, tap } from 'rxjs';
import {
  BasicButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { DetalleAlumnoActions } from '../+state/alumnos.actions';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
})
export class DetalleAlumnoComponent implements OnDestroy {
  private destroy$ = new Subject();
  public currentAlumno$ = this.service.currentAlumno$;
  public inscripcionesDataSource = new MatTableDataSource<Curso>();
  public headers = ['nombre', 'profesor', 'botones'];
  public listItemButtons: ListButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'fab',
      },
      icon: 'delete',
      rolLevels: ['admin'],
    },
  ];

  private currentAlumnoId: number;
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
      .subscribe((a) => (this.currentAlumnoId = a?.id as number));
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public dispatch(cursoId: number, button: BasicButtonDefinition) {
    if (button.kind === 'fab') {
      this.service.dispatch(
        DetalleAlumnoActions.desinscribirAlumnoDelCurso({
          alumnoId: this.currentAlumnoId,
          cursoId: cursoId,
        })
      );
    }
  }

  public returnToList() {
    this.service.navigateToRoot();
  }
}
