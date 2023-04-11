import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { Profesor } from 'src/app/models/models';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.scss'],
})
export class ListaProfesoresComponent {
  public data: Profesor[] = this.appService.listaProfesores;
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
  public dataSource = new MatTableDataSource(this.appService.listaProfesores);

  constructor(private appService: AppService) {}
}
