import { Component, OnDestroy } from '@angular/core';
import { Subject, filter, map } from 'rxjs';
import { ProfesoresService } from '../profesores.service';
import {
  BasicButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/models';
import { DetalleAlumnoActions } from 'src/app/alumnos/+state/alumnos.actions';

@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
})
export class DetalleProfesorComponent implements OnDestroy {
  private destroy$ = new Subject();
  public currentProfesor$ = this.service.currentProfesor$;
  public currentProfesorCursos$ = this.service.currentProfesorCursos$;
  public cursosDataSource = new MatTableDataSource<Curso>();
  public headers = ['id', 'displayName', 'inscriptos'];
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
  constructor(private service: ProfesoresService) {
    this.currentProfesorCursos$
      .pipe(
        filter((x) => !!x),
        map((cursos) => (this.cursosDataSource.data = cursos as Curso[]))
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
