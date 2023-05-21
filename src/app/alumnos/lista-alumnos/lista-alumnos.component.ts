import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter, map } from 'rxjs';
import {
  BasicButtonDefinition,
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { AlumnosService } from '../alumnos.service';
import { Alumno } from 'src/app/models/models';
import { AlumnosActions } from '../+state/alumnos.actions';
import { raceInit } from 'rxjs/internal/observable/race';
@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent implements OnDestroy {
  public destroy$ = new Subject();
  public listLoaded$ = this.service.alumnoListLoaded$;
  public headers: string[] = ['id', 'nombre', 'apellido', 'correo', 'botones'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Nuevo',
      url: 'nuevo',
    },
  ];
  public listItemButtons: ListButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'basic',
      },
      label: 'Ver mas',
    },
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Editar',
    },
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'fab',
      },
      icon: 'delete',
    },
  ];
  public dataSource = new MatTableDataSource<Alumno>();
  constructor(private service: AlumnosService) {
    this.service.listaAlumnos$
      .pipe(
        filter((x) => !!x),
        map((alumnos) => (this.dataSource.data = alumnos as Alumno[]))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }

  public dispatch(id: number, button: BasicButtonDefinition) {
    if (button.kind === 'basic') {
      this.service.navigate([`${id}`], true);
    }
    if (button.kind === 'raised') {
      this.service.navigate(['editar', `${id}`], true);
    }
    if (button.kind === 'fab') {
      this.service.dispatch(
        AlumnosActions.deleteAlumnoButtonClicked({
          alumnoId: id,
        })
      );
    }
  }
}
