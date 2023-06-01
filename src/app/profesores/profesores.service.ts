import { Injectable } from '@angular/core';
import { CreateProfesor, Profesor } from '../models/models';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Action, Store } from '@ngrx/store';
import * as ProfesoresSelectors from './+state/profesores.selectors';
import { filter, map, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  public profesores$ = this.store.select(ProfesoresSelectors.getProfesoresList);
  public profesoresLoaded$ = this.store.select(
    ProfesoresSelectors.getProfestoresListLoaded
  );
  public currentProfesor$ = this.store.select(
    ProfesoresSelectors.getCurrentProfesor
  );
  public currentProfesorCursos$ = this.store.select(
    ProfesoresSelectors.getCurrentProfesorCursos
  );
  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store
  ) {}

  public addProfesor(nuevoProfesor: CreateProfesor) {
    return this.apiService.addProfesor(nuevoProfesor);
  }

  public modifyProfesor(profesor: Profesor) {
    return this.apiService.modifyProfesor(profesor);
  }

  public getProfesores() {
    return this.apiService.getProfesores();
  }
  public findProfesorById(id: string) {
    return this.apiService.getProfesorById(id);
  }

  public deleteProfesorById(id: number) {
    return this.apiService.deleteProfesorById(id);
  }

  public getCursosProfesor(profesorId: number) {
    return this.apiService.getCursos().pipe(
      filter((x) => !!x),
      take(1),
      map((cursos) => cursos.filter((c) => c.profesorId === profesorId))
    );
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

  public navigateToRoot() {
    this.navigate(['profesores'], false);
  }

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
