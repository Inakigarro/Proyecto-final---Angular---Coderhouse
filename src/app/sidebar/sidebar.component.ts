import { Component } from '@angular/core';
import { ExtendedButtonDefinition } from '../components/models/button';
import { Alumno } from '../models/models';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public buttons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Alumnos',
      url: 'alumnos',
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Profesores',
      url: 'profesores',
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Cursos',
    },
  ];

  constructor(private appService: AppService, private router: Router) {}

  public navigate(url: string) {
    this.router.navigate([url]);
  }
}
