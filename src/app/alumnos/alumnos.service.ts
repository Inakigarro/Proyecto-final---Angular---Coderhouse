import { Injectable } from '@angular/core';
import { Alumno } from '../models/models';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { ALUMNOS_ARRAY } from '../local-storage-constants';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  public listaAlumnos: Alumno[] = [];
  public alumnos$ = new Observable<Alumno[]>((s) => s.next(this.listaAlumnos));
  public alumnosLength$ = new Observable<number>((s) =>
    s.next(this.listaAlumnos.length)
  );
  constructor(private router: Router) {
    let data: Alumno[] = JSON.parse(
      localStorage.getItem(ALUMNOS_ARRAY) as string
    );
    data.forEach((a: Alumno) => this.listaAlumnos.push(a));
  }

  public getNewAlumnoId() {
    if (this.listaAlumnos.length === 0) {
      return 1;
    } else {
      return this.listaAlumnos.slice(-1)[0].id + 1;
    }
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
    this.listaAlumnos = this.listaAlumnos.filter((a) => a.id !== id);
    return this.listaAlumnos;
  }

  public findAlumnoById(id: string) {
    return this.listaAlumnos.find((x) => `${x.id}` === id);
  }

  // Navigation.
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
