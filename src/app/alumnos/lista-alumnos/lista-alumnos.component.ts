import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { Alumno } from 'src/app/models/models';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent {
  public data: Alumno[] = this.appService.listaAlumnos;
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
  public dataSource = new MatTableDataSource(this.appService.listaAlumnos);
  constructor(private appService: AppService) {}

  public onEditButtonClicked(id: number) {
    this.appService.navigate(['edit', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.appService.deleteAlumnoById(id);
    this.dataSource.data = this.appService.listaAlumnos;
  }

  public navigate(url: string) {
    this.appService.navigate([url], true);
  }
}
