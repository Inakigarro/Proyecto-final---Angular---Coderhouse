import { Injectable } from '@angular/core';
import { CreateCurso, Curso } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CURSOS_ARRAY } from '../local-storage-constants';
import { CursosApiService } from './cursos-api.service';

@Injectable({ providedIn: 'root' })
export class CursosService {
  public listaCursos: Curso[] = [];
  public cursos$ = this.apiService.get();
  public cursosLength$ = new Observable<number>((s) =>
    s.next(this.listaCursos.length)
  );
  constructor(private router: Router, private apiService: CursosApiService) {}

  public addCurso(nuevoCurso: CreateCurso) {
    return this.apiService.add(nuevoCurso);
  }

  public findCursoById(id: string) {
    return this.apiService.getByI(id);
  }

  public modifyCurso(curso: Curso) {
    return this.apiService.modify(curso);
  }

  public deleteCursoById(id: number) {
    return this.apiService.deleteById(id);
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
