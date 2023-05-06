import { Injectable } from '@angular/core';
import {
  CreateInscripcion,
  Inscripcion,
  InscripcionDto,
} from '../models/models';
import { BehaviorSubject, Observable, filter, of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  public inscripciones$ = this.apiService.getInscripciones();

  public alumnos$ = this.apiService.getAlumnos();
  public cursos$ = this.apiService.getCursos();

  constructor(private router: Router, private apiService: ApiService) {}

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
}
