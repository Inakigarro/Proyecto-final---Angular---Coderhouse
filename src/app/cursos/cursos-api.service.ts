import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso, CreateCurso } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CursosApiService {
  private apiEndpoint = 'https://64504de6a322196911485862.mockapi.io/api/';

  constructor(private httpClient: HttpClient) {}

  // Alumnos.
  public get() {
    return this.httpClient.get<Curso[]>(this.apiEndpoint + 'cursos');
  }

  public getByI(id: string) {
    return this.httpClient.get<Curso>(this.apiEndpoint + 'cursos/' + id);
  }

  public add(curso: CreateCurso) {
    return this.httpClient.post<Curso>(this.apiEndpoint + 'cursos', curso);
  }

  public modify(curso: Curso) {
    return this.httpClient.put<Curso>(
      this.apiEndpoint + `cursos/${curso.id}`,
      curso
    );
  }

  public deleteById(id: number) {
    return this.httpClient.delete<Curso>(this.apiEndpoint + `cursos/${id}`);
  }
}
