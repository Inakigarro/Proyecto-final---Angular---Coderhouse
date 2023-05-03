import { Injectable } from '@angular/core';
import { CreateCurso, Curso } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export class CursosService {
  public listaCursos: Curso[] = [];
  public cursos$ = this.apiService.getCursos();
  public profesores$ = this.apiService.getProfesores();
  public cursosLength$ = new Observable<number>((s) =>
    s.next(this.listaCursos.length)
  );
  constructor(private router: Router, private apiService: ApiService) {}

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
