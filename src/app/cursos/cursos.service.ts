import { Injectable } from '@angular/core';
import { Curso } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CURSOS_ARRAY } from '../local-storage-constants';

@Injectable({ providedIn: 'root' })
export class CursosService {
  public listaCursos: Curso[] = [];
  public cursos$ = new Observable<Curso[]>((s) => s.next(this.listaCursos));
  public cursosLength$ = new Observable<number>((s) =>
    s.next(this.listaCursos.length)
  );
  constructor(private router: Router) {
    let data: Curso[] = JSON.parse(
      localStorage.getItem(CURSOS_ARRAY) as string
    );
    data.forEach((p: Curso) => {
      this.listaCursos.push(p);
    });
  }

  public getNewCursoId() {
    if (this.listaCursos.length === 0) {
      return 1;
    } else {
      return this.listaCursos.slice(-1)[0].id + 1;
    }
  }

  public addCurso(nuevoCurso: Curso) {
    this.listaCursos.push(nuevoCurso);
  }

  public findCursoById(id: string) {
    return this.listaCursos.find((x) => `${x.id}` === id);
  }

  public modifyCurso(curso: Curso) {
    let item = this.listaCursos.find((x) => x.id == curso.id);
    if (item) {
      item.displayName = curso.displayName;
      item.profesorId = curso.profesorId;
      item.inscripciones = curso.inscripciones;
    } else {
      console.error('El curso solicitado no existe.');
    }
  }

  public deleteCursoById(id: number) {
    this.listaCursos = this.listaCursos.filter((p) => p.id !== id);
    return this.listaCursos;
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
