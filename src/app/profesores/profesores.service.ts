import { Injectable } from '@angular/core';
import { Profesor } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  public listaProfesores: Profesor[] = [
    {
      id: 1,
      firstName: 'Tomas',
      lastName: 'Catalini',
      email: 'email@email.com',
    },
  ];

  constructor(private router: Router) {}

  // Profesores.
  public getProfesores = () =>
    new Observable<Profesor[]>((s) => s.next(this.listaProfesores));

  public getProfesoresLength = () =>
    new Observable<number>((s) => s.next(this.listaProfesores.length));

  public getNewProfesorId = () => this.listaProfesores.slice(-1)[0].id + 1;
  public addProfesor(nuevoProfesor: Profesor) {
    this.listaProfesores.push(nuevoProfesor);
  }
  public modifyProfesor(profesor: Profesor) {
    let item = this.listaProfesores.find((x) => x.id === profesor.id);
    if (item) {
      item.firstName = profesor.firstName;
      item.lastName = profesor.lastName;
      item.email = profesor.email;
    } else {
      console.error('El profesor solicitado no existe');
    }
  }

  public findProfesorById(id: string) {
    return this.listaProfesores.find((x) => `${x.id}` === id);
  }
  public deleteAlumnoById(id: number) {
    let indexToRemove = this.listaProfesores.findIndex((x) => x.id === id);
    this.listaProfesores.splice(indexToRemove, 1);
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
