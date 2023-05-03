import { Injectable } from '@angular/core';
import { Alumno, CreateAlumno } from '../models/models';
import { Router } from '@angular/router';
import { AlumnosApiService } from './alumnos-api.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  public alumnos$ = this.apiService.get();

  constructor(private router: Router, private apiService: AlumnosApiService) {}

  public addAlumno(nuevoAlumno: CreateAlumno) {
    return this.apiService.add(nuevoAlumno);
  }

  public modifyAlumno(alumno: Alumno) {
    return this.apiService.modify(alumno);
  }

  public deleteAlumnoById(id: number) {
    return this.apiService.deleteById(id);
  }

  public findAlumnoById(id: string) {
    return this.apiService.getById(id);
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
