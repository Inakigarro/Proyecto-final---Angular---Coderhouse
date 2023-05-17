import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter } from 'rxjs';
import {
  BasicButtonDefinition,
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { InscripcionesService } from '../inscripciones.service';
import { InscripcionDto } from 'src/app/models/models';
import { InscripcionesActions } from '../+state/inscripciones.actions';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss'],
})
export class ListaInscripcionesComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.inscripciones$;
  public headers: string[] = ['id', 'curso', 'alumno', 'botones'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Nueva',
      url: 'nueva',
    },
  ];
  public listItemButtons: ListButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Detalles',
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
  public dataSource = new MatTableDataSource<InscripcionDto>();
  public loaded = false;

  constructor(private service: InscripcionesService) {
    this.data$.subscribe((inscripciones) => {
      let inscripcionesList: InscripcionDto[] = [];
      inscripciones.map((i) => {
        let inscripcion: InscripcionDto = {
          id: i.id,
        };

        this.service
          .findAlumnoById(i.alumnoId)
          .subscribe((a) => (inscripcion.alumno = a));
        this.service
          .findCursoById(i.cursoId)
          .subscribe((c) => (inscripcion.curso = c));

        inscripcionesList.push(inscripcion);
      });

      if (inscripcionesList.length > 0) {
        this.dataSource.data = inscripcionesList;
        this.loaded = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onDetailsButtonClicked(id: number) {
    this.service.navigate(['detalles', `${id}`], true);
  }

  public onDeleteButtonClicked(id: number) {
    this.loaded = false;
    this.service
      .deleteInscripcionById(id)
      .pipe(filter((x) => !!x))
      .subscribe(() => {
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
        InscripcionesActions.editInscripcionButtonClicked({
          inscripcionId: id,
        })
      );
    }

    if (button.kind === 'fab') {
      this.service.dispatch(
        InscripcionesActions.deleteInscripcionButtonClicked({
          inscripcionId: id,
        })
      );
    }
  }
}
