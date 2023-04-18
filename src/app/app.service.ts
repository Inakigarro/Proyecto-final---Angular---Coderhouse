import { Inject, Injectable } from '@angular/core';
import { Alumno, Profesor } from './models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs';

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
    private activatedRoute: ActivatedRoute,
    @Inject(APP_BASE_HREF)
    private baseUrl: string
  ) {}

  public getBaseUrl = () => this.baseUrl;
}
