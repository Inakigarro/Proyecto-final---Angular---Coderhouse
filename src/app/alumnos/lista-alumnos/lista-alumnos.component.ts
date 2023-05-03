import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter } from 'rxjs';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { AlumnosService } from '../alumnos.service';
import { Alumno } from 'src/app/models/models';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.alumnos$;
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
  public dataSource = new MatTableDataSource<Alumno>();
  public loaded = false;
  constructor(private service: AlumnosService) {
    this.data$.subscribe((alumnos) => {
      this.dataSource.data = alumnos;
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
      .deleteAlumnoById(id)
      .pipe(filter((x) => !!x))
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter((x) => x.id !== id);
        this.loaded = true;
      });
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }
}
