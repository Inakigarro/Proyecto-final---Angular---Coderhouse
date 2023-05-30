import { Component, OnDestroy } from '@angular/core';
import { Subject, filter, map } from 'rxjs';
import { CursosService } from '../cursos.service';
import {
  BasicButtonDefinition,
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/models';
import { InscripcionesActions } from 'src/app/inscripciones/+state/inscripciones.actions';
import { CursosActions } from '../+state/cursos.actions';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss'],
})
export class ListaCursosComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.listaCursos$;
  public headers: string[] = ['id', 'displayName', 'inscriptos', 'botones'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Nuevo',
      url: 'nuevo',
      rolLevels: ['admin'],
    },
  ];
  public listItemButtons: ListButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'basic',
      },
      label: 'Ver Mas',
      rolLevels: ['admin', 'user'],
    },
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Editar',
      rolLevels: ['admin'],
    },
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
  public dataSource = new MatTableDataSource<Curso>();
  public listLoaded$ = this.service.getListLoaded$;
  constructor(private service: CursosService) {
    this.data$
      .pipe(
        filter((x) => !!x),
        map((cursos) => (this.dataSource.data = cursos as Curso[]))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  public onEditButtonClicked(id: number) {
    this.service.navigate(['editar', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.service
      .deleteCursoById(id)
      .pipe(filter((x) => !!x))
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter((x) => x.id !== id);
      });
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }

  public dispatch(id: number, button: BasicButtonDefinition) {
    if (button.kind === 'basic') {
      this.service.navigate([`${id}`], true);
    }

    if (button.kind === 'raised') {
      this.service.dispatch(
        CursosActions.editCursoButtonClicked({
          cursoId: id,
        })
      );
    }

    if (button.kind === 'fab') {
      this.service.dispatch(
        CursosActions.deleteCursoButtonClicked({
          cursoId: id,
        })
      );
    }
  }
}
