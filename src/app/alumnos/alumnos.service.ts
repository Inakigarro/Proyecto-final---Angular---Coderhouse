import { Injectable } from '@angular/core';
import { Alumno, CreateAlumno } from '../models/models';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  public alumnos$ = this.apiService.getAlumnos();

  constructor(private router: Router, private apiService: ApiService) {}

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
