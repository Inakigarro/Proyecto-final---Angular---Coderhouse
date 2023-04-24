import { Inject, Injectable } from '@angular/core';
import { Profesor } from './models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// Este servicio sera utilizado para brindar data de prueba.
@Injectable({
  providedIn: 'root',
})
export class AppService {
  public listaProfesores: Profesor[] = [
    {
      id: '1',
      firstName: 'Tomas',
      lastName: 'Catalini',
      email: 'email@email.com',
    },
  ];
  constructor(
    private router: Router,
    @Inject(APP_BASE_HREF)
    private baseUrl: string
  ) {}

  public getBaseUrl = () => this.baseUrl;
  public navigate(url: string[], isRelative: boolean = false) {
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
