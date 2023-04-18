import { Injectable } from '@angular/core';
import { Profesor } from '../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  public listaProfesores: Profesor[] = [
    {
      id: '1',
      firstName: 'Tomas',
      lastName: 'Catalini',
      email: 'email@email.com',
    },
  ];

  constructor(private router: Router) {}

  // Profesores.
  public getProfesores = () =>
    new Observable<Profesor[]>((s) => s.next(this.listaProfesores));

  public getProfesoresLength = () =>
    new Observable<number>((s) => s.next(this.listaProfesores.length));

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
