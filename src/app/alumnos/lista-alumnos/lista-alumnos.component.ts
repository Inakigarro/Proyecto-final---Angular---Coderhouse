import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { Alumno } from 'src/app/models/models';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent {
  public data: Alumno[] = this.appService.listaAlumnos;
  public headers: string[] = ['id', 'nombre', 'apellido', 'correo'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'New',
    },
  ];
  public dataSource = new MatTableDataSource(this.appService.listaAlumnos);
  constructor(private appService: AppService) {}
}
