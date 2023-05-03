import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter } from 'rxjs';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { InscripcionesService } from '../inscripciones.service';
import { InscripcionDto } from 'src/app/models/models';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss'],
})
export class ListaInscripcionesComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.buildIncripcionList();
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
    this.data$.pipe(filter((x) => !!x)).subscribe((inscripciones) => {
      console.log(inscripciones);

      this.dataSource.data = inscripciones;
      this.loaded = true;
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
}
