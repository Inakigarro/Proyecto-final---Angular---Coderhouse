import { Component, OnDestroy } from '@angular/core';
import { Subject, filter } from 'rxjs';
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
  public data$ = this.service.cursos$;
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
    },
  ];
  public listItemButtons: ListButtonDefinition[] = [
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
  public dataSource = new MatTableDataSource<Curso>();
  public loaded = false;
  constructor(private service: CursosService) {
    this.data$.subscribe((cursos) => {
      this.dataSource.data = cursos;
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  public onEditButtonClicked(id: number) {
    this.service.navigate(['editar', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.loaded = false;
    this.service
      .deleteCursoById(id)
      .pipe(filter((x) => !!x))
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter((x) => x.id !== id);
        this.loaded = true;
      });
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }

  public dispatch(id: number, button: BasicButtonDefinition) {
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
