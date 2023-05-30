import { Component } from '@angular/core';
import { ExtendedButtonDefinition } from '../components/models/button';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { filter, map } from 'rxjs';

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
      label: 'Usuarios',
      url: 'usuarios',
      rolLevels: ['admin'],
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Alumnos',
      url: 'alumnos',
      rolLevels: ['admin', 'user'],
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Profesores',
      url: 'profesores',
      rolLevels: ['admin', 'user'],
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Cursos',
      url: 'cursos',
      rolLevels: ['admin', 'user'],
    },
    {
      buttonDefinition: {
        kind: 'raised',
        buttonType: 'normal',
        type: 'basic',
      },
      label: 'Inscripciones',
      url: 'inscripciones',
      rolLevels: ['admin', 'user'],
    },
  ];
  public currentUser$ = this.authService.getCurrentUser();
  constructor(
    private appService: AppService,
    private authService: AuthenticationService
  ) {}

  public navigate(url: string) {
    this.appService.navigate([url]);
  }

  public hasPermission(button: ExtendedButtonDefinition) {
    return this.currentUser$.pipe(
      filter((user) => !!user),
      map((user) => button.rolLevels?.includes(user?.rol as string))
    );
  }
}
