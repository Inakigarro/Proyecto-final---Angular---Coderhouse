import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter, map } from 'rxjs';
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
  public inCreationForm$ = this.alumnosService.inCreationForm$();
  public inEditionForm$ = this.alumnosService.inEditionForm$();
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
  public navigated = false;

  constructor(private alumnosService: AlumnosService) {
    this.data$
      .pipe(
        filter((x) => !!x),
        map((alumnos) => alumnos.forEach((a) => this.dataSource.data.push(a)))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onEditButtonClicked(id: number) {
    this.alumnosService.navigate(['editar', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.alumnosService.deleteAlumnoById(id);
    this.dataSource.data = this.alumnosService.listaAlumnos;
  }

  public navigate(url: string) {
    this.alumnosService.navigate([url], true);
    if (url === 'nuevo') {
      this.alumnosService.inCreationForm = true;
    }
  }
}
