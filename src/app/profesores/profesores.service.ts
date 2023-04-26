import { Injectable } from '@angular/core';
import { Profesor } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PROFESORES_ARRAY } from '../local-storage-constants';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private listaProfesores: Profesor[] = [];
  public profesores$ = new Observable<Profesor[]>((s) =>
    s.next(this.listaProfesores)
  );
  public profesoresLength$ = new Observable<number>((s) =>
    s.next(this.listaProfesores.length)
  );

  constructor(private router: Router) {
    let data: Profesor[] = JSON.parse(
      localStorage.getItem(PROFESORES_ARRAY) as string
    );
    data.forEach((p: Profesor) => {
      this.listaProfesores.push(p);
    });
  }

  public getNewProfesorId() {
    if (this.listaProfesores.length === 0) {
      return 1;
    } else {
      return this.listaProfesores.slice(-1)[0].id + 1;
    }
  }
  public addProfesor(nuevoProfesor: Profesor) {
    this.listaProfesores.push(nuevoProfesor);
  }
  public modifyProfesor(profesor: Profesor) {
    let item = this.listaProfesores.find((x) => x.id === profesor.id);
    if (item) {
      item.firstName = profesor.firstName;
      item.lastName = profesor.lastName;
      item.email = profesor.email;
    } else {
      console.error('El profesor solicitado no existe');
    }
  }

  public findProfesorById(id: string) {
    return this.listaProfesores.find((x) => `${x.id}` === id);
  }
  public deleteProfesorById(id: number) {
    this.listaProfesores = this.listaProfesores.filter((p) => p.id !== id);
    return this.listaProfesores;
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
