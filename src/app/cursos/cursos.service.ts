import { Injectable } from '@angular/core';
import { CreateCurso, Curso } from '../models/models';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Action, Store } from '@ngrx/store';
import * as CursosSelectors from './+state/cursos.selectors';

@Injectable({ providedIn: 'root' })
export class CursosService {
  public listaCursos$ = this.store.select(CursosSelectors.getCursosList);
  public currentCurso$ = this.store.select(CursosSelectors.getCurrentCurso);
  public currentProfesor$ = this.store.select(
    CursosSelectors.getCurrentProfesor
  );
  public cursos$ = this.apiService.getCursos();
  public profesores$ = this.apiService.getProfesores();
  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store
  ) {}

  public addCurso(nuevoCurso: CreateCurso) {
    return this.apiService.addCurso(nuevoCurso);
  }

  public findCursoById(id: string) {
    return this.apiService.getCursoById(id);
  }

  public modifyCurso(curso: Curso) {
    return this.apiService.modifyCurso(curso);
  }

  public deleteCursoById(id: number) {
    return this.apiService.deleteCursoById(id);
  }

  public findProfesorById(id: number) {
    return this.apiService.getProfesorById(id.toString());
  }

  public getInscripcionesByCursoId(id: number) {
    return this.apiService
      .getInscripciones()
      .pipe(map((ins) => ins.filter((i) => i.cursoId === id)));
  }

  public getAlumnosInscriptos(ids: number[]) {
    return this.apiService
      .getAlumnos()
      .pipe(map((alumnos) => alumnos.filter((a) => ids.includes(a.id))));
  }

  public getListLoaded$ = this.store.select(
    CursosSelectors.getCursosListLoaded
  );

  public navigateToRoot() {
    this.navigate(['cursos'], false);
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
