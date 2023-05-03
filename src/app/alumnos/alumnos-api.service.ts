import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno, CreateAlumno } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AlumnosApiService {
  private apiEndpoint = 'https://64504de6a322196911485862.mockapi.io/api/';

  constructor(private httpClient: HttpClient) {}

  public get() {
    return this.httpClient.get<Alumno[]>(this.apiEndpoint + 'alumnos');
  }

  public getById(id: string) {
    return this.httpClient.get<Alumno>(this.apiEndpoint + 'alumnos/' + id);
  }

  public add(alumno: CreateAlumno) {
    return this.httpClient.post<Alumno>(this.apiEndpoint + 'alumnos', alumno);
  }

  public modify(alumno: Alumno) {
    return this.httpClient.put<Alumno>(
      this.apiEndpoint + `alumnos/${alumno.id}`,
      alumno
    );
  }

  public deleteById(id: number) {
    return this.httpClient.delete<Alumno>(this.apiEndpoint + `alumnos/${id}`);
  }
}
