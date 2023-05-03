import { Injectable } from '@angular/core';
import { CreateProfesor, Profesor } from '../models/models';
import { Router } from '@angular/router';
import { PROFESORES_ARRAY } from '../local-storage-constants';
import { ProfesoresApiService } from './profesores-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  public profesores$ = this.apiService.get();

  constructor(
    private router: Router,
    private apiService: ProfesoresApiService
  ) {}

  public addProfesor(nuevoProfesor: CreateProfesor) {
    return this.apiService.add(nuevoProfesor);
  }

  public modifyProfesor(profesor: Profesor) {
    return this.apiService.modify(profesor);
  }

  public findProfesorById(id: string) {
    return this.apiService.getById(id);
  }

  public deleteProfesorById(id: number) {
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
