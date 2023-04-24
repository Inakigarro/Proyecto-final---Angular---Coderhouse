import { Injectable } from '@angular/core';
import { Alumno } from '../models/models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
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
  constructor(private router: Router) {}

  public getAlumnos = () =>
    new Observable<Alumno[]>((s) => s.next(this.listaAlumnos));
  public getAlumnosLength = () =>
    new Observable<number>((s) => s.next(this.listaAlumnos.length));
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

  // Navigation.
  public inCreationForm = false;
  public inCreationForm$ = () =>
    new Observable<boolean>((s) => s.next(this.inCreationForm));
  public inEditionForm = false;
  public inEditionForm$ = () =>
    new Observable<boolean>((s) => s.next(this.inEditionForm));

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
