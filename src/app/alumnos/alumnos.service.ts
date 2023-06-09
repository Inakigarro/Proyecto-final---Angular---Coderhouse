import { Injectable } from '@angular/core';
import { Alumno, CreateAlumno } from '../models/models';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Action, Store } from '@ngrx/store';
import * as AlumnosSelectors from './+state/alumnos.selectors';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store
  ) {}

  public addAlumno(nuevoAlumno: CreateAlumno) {
    return this.apiService.addAlumno(nuevoAlumno);
  }

  public modifyAlumno(alumno: Alumno) {
    return this.apiService.modifyAlumno(alumno);
  }

  public deleteAlumnoById(id: number) {
    return this.apiService.deleteAlumnoById(id);
  }

  public findAlumnoById(id: string) {
    return this.apiService.getAlumnoById(id);
  }

  public getAlumnos() {
    return this.apiService.getAlumnos();
  }

  public getInscripcionesByAlumno(id: number) {
    return this.apiService.getInscripciones().pipe(
      filter((x) => !!x),
      map((ins) => ins.filter((i) => i.alumnoId == id))
    );
  }

  public getCursosInscriptos(ids: number[]) {
    return this.apiService
      .getCursos()
      .pipe(map((cursos) => cursos.filter((c) => ids.includes(c.id))));
  }

  public getInscripcionByAlumnoAndCurso(alumnoId: number, cursoId: number) {
    return this.apiService.getInscripciones().pipe(
      filter((x) => !!x),
      map((ins) =>
        ins.find((i) => i.alumnoId === alumnoId && i.cursoId === cursoId)
      )
    );
  }

  public deleteInscripcionById(id: number) {
    return this.apiService.deleteInscripcionById(id);
  }

  // Selectors.
  public alumnoListLoaded$ = this.store.select(
    AlumnosSelectors.getAlumnoListLoaded
  );
  public listaAlumnos$ = this.store.select(AlumnosSelectors.getAlumnosList);

  public currentAlumno$ = this.store.select(AlumnosSelectors.getCurrentAlumno);

  public currentAlumnoInscripciones$ = this.store.select(
    AlumnosSelectors.getCurrentAlumnoInscripciones
  );
  // Navigation.
  public navigateToRoot() {
    this.navigate(['alumnos'], false);
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

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
