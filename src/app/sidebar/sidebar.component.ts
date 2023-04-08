import { Component } from '@angular/core';
import { ExtendedButtonDefinition } from '../components/models/button';
import { Alumno } from '../models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public botones: string[] = [
    'Alumnos',
    'Profesores',
    'Cursos',
    'Trabajo',
    'Contacto',
  ];

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

  public listHeader = ['id', 'nombre', 'apellido'];
  public listItems: Alumno[] = [
    {
      id: '1',
      firstName: 'Iñaki',
      lastName: 'Garro',
      email: 'email@email.com',
      phone: '123456789',
    },
    {
      id: '2',
      firstName: 'Lucia',
      lastName: 'Garcia',
      email: 'email@email.com',
      phone: '123456789',
    },
    {
      id: '3',
      firstName: 'Agustin',
      lastName: 'Brutten',
      email: 'email@email.com',
      phone: '123456789',
    },
    {
      id: '4',
      firstName: 'Federico',
      lastName: 'Emens',
      email: 'email@email.com',
      phone: '123456789',
    },
  ];
}
