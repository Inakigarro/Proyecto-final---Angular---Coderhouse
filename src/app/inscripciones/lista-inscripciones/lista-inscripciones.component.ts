import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { InscripcionesService } from '../inscripciones.service';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss'],
})
export class ListaInscripcionesComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.inscripciones$;
  public dataLength$ = this.service.inscripcionesLength$;
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
  public dataSource = new MatTableDataSource();

  constructor(private service: InscripcionesService) {
    this.data$.subscribe((inscripciones) =>
      inscripciones.forEach((i) => this.dataSource.data.push(i))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onDetailsButtonClicked(id: number) {
    this.service.navigate(['detalles', `${id}`], true);
  }

  public onDeleteButtonClicked(id: number) {
    this.dataSource.data = this.service.deleteInscripcionById(id);
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }
}
