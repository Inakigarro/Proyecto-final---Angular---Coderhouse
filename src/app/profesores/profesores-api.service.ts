import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor, CreateProfesor } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProfesoresApiService {
  private apiEndpoint = 'https://64504de6a322196911485862.mockapi.io/api/';
  constructor(private httpClient: HttpClient) {}
  public get() {
    return this.httpClient.get<Profesor[]>(this.apiEndpoint + 'profesores');
  }

  public getById(id: string) {
    return this.httpClient.get<Profesor>(this.apiEndpoint + 'profesores/' + id);
  }

  public add(curso: CreateProfesor) {
    return this.httpClient.post<Profesor>(
      this.apiEndpoint + 'profesores',
      curso
    );
  }

  public modify(curso: Profesor) {
    return this.httpClient.put<Profesor>(
      this.apiEndpoint + `profesores/${curso.id}`,
      curso
    );
  }

  public deleteById(id: number) {
    return this.httpClient.delete<Profesor>(
      this.apiEndpoint + `profesores/${id}`
    );
  }
}
