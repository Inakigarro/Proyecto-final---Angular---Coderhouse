import { Inject, Injectable } from '@angular/core';
import { Alumno, Curso, Profesor } from './models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import {
  ALUMNOS_ARRAY,
  CURSOS_ARRAY,
  PROFESORES_ARRAY,
} from './local-storage-constants';

// Este servicio sera utilizado para brindar data de prueba.
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private listaAlumnos: Alumno[] = [
    {
      id: 1,
      firstName: 'Iñaki',
      lastName: 'Garro',
      email: 'email@email.com',
      phone: '123456789',
    },
    {
      id: 2,
      firstName: 'Lucia',
      lastName: 'Garcia',
      email: 'email@email.com',
      phone: '123456789',
    },
    {
      id: 3,
      firstName: 'Agustin',
      lastName: 'Brutten',
      email: 'email@email.com',
      phone: '123456789',
    },
    {
      id: 4,
      firstName: 'Federico',
      lastName: 'Emens',
      email: 'email@email.com',
      phone: '123456789',
    },
  ];
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
      profesorId: 1,
      inscripciones: [],
    },
    {
      id: 2,
      displayName: 'Programacion Web',
      profesorId: 1,
      inscripciones: [],
    },
    {
      id: 3,
      displayName: 'Angular',
      profesorId: 1,
      inscripciones: [],
    },
  ];
  constructor(
    private router: Router,
    @Inject(APP_BASE_HREF)
    private baseUrl: string
  ) {}
  public seedInLocalStorage() {
    localStorage.setItem(ALUMNOS_ARRAY, JSON.stringify(this.listaAlumnos));
    localStorage.setItem(
      PROFESORES_ARRAY,
      JSON.stringify(this.listaProfesores)
    );
    localStorage.setItem(CURSOS_ARRAY, JSON.stringify(this.listaCursos));
  }
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
