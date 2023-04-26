import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { ProfesoresService } from '../profesores.service';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.scss'],
})
export class ListaProfesoresComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.profesoresService.profesores$;
  public dataLength$ = this.profesoresService.profesoresLength$;
  public headers: string[] = ['id', 'nombre', 'apellido', 'correo', 'botones'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'New',
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
  public dataSource = new MatTableDataSource();

  constructor(private profesoresService: ProfesoresService) {
    this.data$.subscribe({
      next: (profesores) => (this.dataSource.data = profesores),
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onEditButtonClicked(id: number) {
    this.profesoresService.navigate(['editar', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.dataSource.data = this.profesoresService.deleteProfesorById(id);
  }

  public navigate(url: string) {
    this.profesoresService.navigate([url], true);
  }
}
