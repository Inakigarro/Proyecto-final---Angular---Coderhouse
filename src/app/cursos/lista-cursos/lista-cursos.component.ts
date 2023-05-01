import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CursosService } from '../cursos.service';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss'],
})
export class ListaCursosComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.cursos$;
  public dataLength$ = this.service.cursosLength$;
  public headers: string[] = ['id', 'displayName', 'inscriptos', 'botones'];
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
  constructor(private service: CursosService) {
    this.data$.subscribe({
      next: (cursos) => (this.dataSource.data = cursos),
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
    this.dataSource.data = this.service.deleteCursoById(id);
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }
}
