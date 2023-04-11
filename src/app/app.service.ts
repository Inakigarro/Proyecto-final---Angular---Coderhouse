import { Inject, Injectable } from '@angular/core';
import { Alumno, Profesor } from './models/models';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// Este servicio sera utilizado para brindar data de prueba.
@Injectable({
  providedIn: 'root',
})
export class AppService {
  public listaAlumnos: Alumno[] = [
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
  public listaProfesores: Profesor[] = [
    {
      id: '1',
      firstName: 'Tomas',
      lastName: 'Catalini',
      email: 'email@email.com',
    },
  ];
  constructor(
    private router: Router,
    @Inject(APP_BASE_HREF)
    private baseUrl: string
  ) {}

  public getBaseUrl = () => this.baseUrl;
}
