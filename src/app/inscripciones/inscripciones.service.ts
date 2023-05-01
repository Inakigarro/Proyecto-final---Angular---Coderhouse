import { Injectable } from '@angular/core';
import { Alumno, Curso, Inscripcion } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  ALUMNOS_ARRAY,
  CURSOS_ARRAY,
  INSCRIPCIONES_ARRAY,
} from '../local-storage-constants';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  public listaInscripciones: Inscripcion[] = [];
  public listaAlumnos: Alumno[] = [];
  public listaCursos: Curso[] = [];
  public inscripciones$ = new Observable<Inscripcion[]>((s) =>
    s.next(this.listaInscripciones)
  );
  public inscripcionesLength$ = new Observable<number>((s) =>
    s.next(this.listaInscripciones.length)
  );

  public alumnos$ = new Observable<Alumno[]>((s) => s.next(this.listaAlumnos));
  public cursos$ = new Observable<Curso[]>((s) => s.next(this.listaCursos));
  constructor(private router: Router) {
    let inscripciones: Inscripcion[] = JSON.parse(
      localStorage.getItem(INSCRIPCIONES_ARRAY) as string
    );
    inscripciones.forEach((i: Inscripcion) => this.listaInscripciones.push(i));
    let alumnos: Alumno[] = JSON.parse(
      localStorage.getItem(ALUMNOS_ARRAY) as string
    );
    alumnos.forEach((a: Alumno) => this.listaAlumnos.push(a));
    let cursos: Curso[] = JSON.parse(
      localStorage.getItem(CURSOS_ARRAY) as string
    );
    cursos.forEach((c: Curso) => this.listaCursos.push(c));
  }

  public addInscripcion(inscripcion: Inscripcion) {
    this.listaInscripciones.push(inscripcion);
  }
  public addIncripcionToCurso(inscripcion: Inscripcion) {
    let curso = this.listaCursos.find((x) => (x.id = inscripcion.curso.id));
    curso?.inscripciones.push(inscripcion.id);
    localStorage.setItem(CURSOS_ARRAY, JSON.stringify(this.listaCursos));
  }
  public findInscripcionById(id: string) {
    return this.listaInscripciones.find((x) => `${x.id}` === id);
  }

  public deleteInscripcionById(id: number) {
    return this.listaInscripciones.filter((i) => i.id !== id);
  }

  public getInscripcionId() {
    if (this.listaInscripciones.length === 0) {
      return 1;
    } else {
      return this.listaInscripciones.slice(-1)[0].id + 1;
    }
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
