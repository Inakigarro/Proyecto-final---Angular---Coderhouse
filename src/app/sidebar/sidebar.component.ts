import { Component } from '@angular/core';
import { ExtendedButtonDefinition } from '../components/models/button';
import { AppService } from '../app.service';

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
      url: 'cursos',
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Inscripciones',
      url: 'inscripciones',
    },
  ];

  constructor(private appService: AppService) {}

  public navigate(url: string) {
    this.appService.navigate([url]);
  }
}
