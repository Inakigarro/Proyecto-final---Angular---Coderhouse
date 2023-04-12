import { Inject, Injectable } from '@angular/core';
import { Alumno, Profesor } from './models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// Este servicio sera utilizado para brindar data de prueba.
@Injectable({
  providedIn: 'root',
})
export class AppService {
  public listaAlumnos: Alumno[] = [
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
    private activatedRoute: ActivatedRoute,
    @Inject(APP_BASE_HREF)
    private baseUrl: string
  ) {}

  public getBaseUrl = () => this.baseUrl;

  // Alumnos.
  public getNewAlumnoId() {
    let lastId = this.listaAlumnos.slice(-1)[0].id + 1;
    return lastId;
  }

  public addAlumno(nuevoAlumno: Alumno) {
    this.listaAlumnos.push(nuevoAlumno);
  }
  public modifyAlumno(alumno: Alumno) {
    let item = this.listaAlumnos.find((x) => x.id === alumno.id);
    if (item) {
      item.firstName = alumno.firstName;
      item.lastName = alumno.lastName;
      item.email = alumno.email;
      item.phone = alumno.phone;
    } else {
      console.error('El alumno solicitado no existe');
    }
  }
  public deleteAlumnoById(id: number) {
    let indexToRemove = this.listaAlumnos.findIndex((x) => x.id === id);
    this.listaAlumnos.splice(indexToRemove, 1);
  }

  public findAlumnoById(id: string) {
    let alumno = this.listaAlumnos.find((x) => `${x.id}` === id);
    return alumno;
  }

  public navigate(url: string[], isRelative: boolean) {
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
