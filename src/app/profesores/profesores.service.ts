import { Injectable } from '@angular/core';
import { CreateProfesor, Profesor } from '../models/models';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  public profesores$ = this.apiService.getProfesores();

  constructor(private router: Router, private apiService: ApiService) {}

  public addProfesor(nuevoProfesor: CreateProfesor) {
    return this.apiService.addProfesor(nuevoProfesor);
  }

  public modifyProfesor(profesor: Profesor) {
    return this.apiService.modifyProfesor(profesor);
  }

  public findProfesorById(id: string) {
    return this.apiService.getProfesorById(id);
  }

  public deleteProfesorById(id: number) {
    return this.apiService.deleteProfesorById(id);
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
