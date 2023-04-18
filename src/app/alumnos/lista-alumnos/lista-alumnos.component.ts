import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter, tap } from 'rxjs';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.alumnosService.getAlumnos();
  public dataLength$ = this.alumnosService.getAlumnosLength();
  public headers: string[] = ['id', 'nombre', 'apellido', 'correo', 'botones'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'New',
      url: 'new-alumno',
    },
  ];
  public listItemButtons: ListButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Edit',
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
  constructor(private alumnosService: AlumnosService) {
    this.data$
      .pipe(
        filter((x) => !!x),
        tap((alumnos) => alumnos.forEach((a) => this.dataSource.data.push(a)))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    console.log('observable destruido');
  }

  public onEditButtonClicked(id: number) {
    this.alumnosService.navigate(['edit', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.alumnosService.deleteAlumnoById(id);
    this.dataSource.data = this.alumnosService.listaAlumnos;
  }

  public navigate(url: string) {
    this.alumnosService.navigate([url], true);
  }
}
