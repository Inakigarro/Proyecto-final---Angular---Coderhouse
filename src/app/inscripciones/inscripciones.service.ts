import { Injectable } from '@angular/core';
import { CreateInscripcion, Curso, Inscripcion } from '../models/models';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Action, Store } from '@ngrx/store';
import * as InscripcionesSelectors from './+state/inscripciones.selectors';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  public inscripciones$ = this.store.select(
    InscripcionesSelectors.getInscripcionesList
  );
  public inscripcionesLoaded$ = this.store.select(
    InscripcionesSelectors.getInscripcionesListLoaded
  );

  public currentInscripcion$ = this.store.select(
    InscripcionesSelectors.getCurrentInscripcion
  );

  public currentInscripcionLoaded$ = this.store.select(
    InscripcionesSelectors.getCurrentInscripcionLoaded
  );

  public alumnos$ = this.apiService.getAlumnos();
  public cursos$ = this.apiService.getCursos();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store
  ) {}

  // Inscripciones.
  public addInscripcion(inscripcion: CreateInscripcion) {
    return this.apiService.addInscripcion(inscripcion);
  }

  public addIncripcionToCurso(inscripcion: Inscripcion) {
    this.apiService
      .getCursoById(inscripcion.cursoId.toString())
      .subscribe((c) => {
        c.inscripciones.push(inscripcion.id);
        this.apiService.modifyCurso(c).subscribe();
      });
  }

  public getInscripciones() {
    return this.apiService.getInscripciones();
  }

  public findInscripcionById(id: string) {
    return this.apiService.getInscripcionById(id);
  }

  public deleteInscripcionById(id: number) {
    return this.apiService.deleteInscripcionById(id);
  }

  // Alumnos.
  public findAlumnoById(id: number) {
    return this.apiService.getAlumnoById(id.toString());
  }

  // Cursos.
  public findCursoById(id: number) {
    return this.apiService.getCursoById(id.toString());
  }
  public updateCurso(curso: Curso) {
    return this.apiService.modifyCurso(curso);
  }

  // Profesores.
  public findProfesorById(id: number) {
    return this.apiService.getProfesorById(id.toString());
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

  public navigateToRoot() {
    this.navigate(['inscripciones'], false);
  }

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
