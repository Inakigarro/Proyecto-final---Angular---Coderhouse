import { Inject, Injectable } from '@angular/core';
import { Alumno, Curso, Inscripcion, Profesor } from './models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import {
  ALUMNOS_ARRAY,
  CURSOS_ARRAY,
  INSCRIPCIONES_ARRAY,
  PROFESORES_ARRAY,
} from './local-storage-constants';
import { HttpClient } from '@angular/common/http';

// Este servicio sera utilizado para brindar data de prueba.
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiEndpoint = 'https://64504de6a322196911485862.mockapi.io/api/';
  private listaProfesores: Profesor[] = [
    {
      id: 1,
      firstName: 'Tomas',
      lastName: 'Catalini',
      email: 'email@email.com',
    },
  ];
  private listaCursos: Curso[] = [
    {
      id: 1,
      displayName: 'Desarrollo Web',
      profesor: {
        id: 1,
        firstName: 'Tomas',
        lastName: 'Catalini',
        email: 'email@email.com',
      },
      inscripciones: [],
    },
    {
      id: 2,
      displayName: 'Programacion Web',
      profesor: {
        id: 1,
        firstName: 'Tomas',
        lastName: 'Catalini',
        email: 'email@email.com',
      },
      inscripciones: [],
    },
    {
      id: 3,
      displayName: 'Angular',
      profesor: {
        id: 1,
        firstName: 'Tomas',
        lastName: 'Catalini',
        email: 'email@email.com',
      },
      inscripciones: [1],
    },
  ];
  private listInscripciones: Inscripcion[] = [
    {
      id: 1,
      alumno: {
        id: 1,
        firstName: 'Iñaki',
        lastName: 'Garro',
        email: 'email@email.com',
        phone: '123456789',
      },
      curso: {
        id: 3,
        displayName: 'Angular',
        profesor: {
          id: 1,
          firstName: 'Tomas',
          lastName: 'Catalini',
          email: 'email@email.com',
        },
        inscripciones: [],
      },
    },
  ];
  constructor(
    private router: Router,
    @Inject(APP_BASE_HREF)
    private baseUrl: string
  ) {}

  public navigate(url: string[], isRelative: boolean = false) {
    let urlArray: string[] = [];
    if (isRelative) {
      urlArray.push(this.router.url);
      url.forEach((x) => urlArray.push(x));
      this.router.navigate(urlArray);
    } else {
      url.forEach((x) => urlArray.push(x));
      this.router.navigate(url);
    }
  }
}
