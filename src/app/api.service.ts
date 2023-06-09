import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Alumno,
  CreateAlumno,
  CreateCurso,
  CreateInscripcion,
  CreateProfesor,
  CreateUsuario,
  Curso,
  Inscripcion,
  Profesor,
  Usuario,
} from './models/models';
import { filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiEndpoint = 'https://64504de6a322196911485862.mockapi.io/api/';
  constructor(private httpClient: HttpClient) {}

  // Alumnos.
  public getAlumnos() {
    return this.httpClient.get<Alumno[]>(this.apiEndpoint + 'alumnos');
  }
  public getAlumnoById(id: string) {
    return this.httpClient.get<Alumno>(this.apiEndpoint + 'alumnos/' + id);
  }
  public addAlumno(alumno: CreateAlumno) {
    return this.httpClient.post<Alumno>(this.apiEndpoint + 'alumnos', alumno);
  }
  public modifyAlumno(alumno: Alumno) {
    return this.httpClient.put<Alumno>(
      this.apiEndpoint + `alumnos/${alumno.id}`,
      alumno
    );
  }
  public deleteAlumnoById(id: number) {
    return this.httpClient.delete<Alumno>(this.apiEndpoint + `alumnos/${id}`);
  }

  // Profesores.
  public getProfesores() {
    return this.httpClient.get<Profesor[]>(this.apiEndpoint + 'profesores');
  }
  public getProfesorById(id: string) {
    return this.httpClient.get<Profesor>(this.apiEndpoint + 'profesores/' + id);
  }
  public addProfesor(curso: CreateProfesor) {
    return this.httpClient.post<Profesor>(
      this.apiEndpoint + 'profesores',
      curso
    );
  }
  public modifyProfesor(profesor: Profesor) {
    return this.httpClient.put<Profesor>(
      this.apiEndpoint + `profesores/${profesor.id}`,
      profesor
    );
  }
  public deleteProfesorById(id: number) {
    return this.httpClient.delete<Profesor>(
      this.apiEndpoint + `profesores/${id}`
    );
  }

  // Cursos.
  public getCursos() {
    return this.httpClient.get<Curso[]>(this.apiEndpoint + 'cursos');
  }
  public getCursoById(id: string) {
    return this.httpClient.get<Curso>(this.apiEndpoint + 'cursos/' + id);
  }
  public addCurso(curso: CreateCurso) {
    return this.httpClient.post<Curso>(this.apiEndpoint + 'cursos', curso);
  }
  public modifyCurso(curso: Curso) {
    return this.httpClient.put<Curso>(
      this.apiEndpoint + `cursos/${curso.id}`,
      curso
    );
  }
  public deleteCursoById(id: number) {
    return this.httpClient.delete<Curso>(this.apiEndpoint + `cursos/${id}`);
  }

  // Inscripciones.
  public getInscripciones() {
    return this.httpClient.get<Inscripcion[]>(
      this.apiEndpoint + 'inscripciones'
    );
  }

  public getInscripcionById(id: string) {
    return this.httpClient.get<Inscripcion>(
      this.apiEndpoint + 'inscripciones/' + id
    );
  }

  public addInscripcion(inscripcion: CreateInscripcion) {
    return this.httpClient.post<Inscripcion>(
      this.apiEndpoint + 'inscripciones',
      inscripcion
    );
  }

  public modifyInscripcion(inscripcion: Inscripcion) {
    return this.httpClient.put<Inscripcion>(
      this.apiEndpoint + `inscripciones/${inscripcion.id}`,
      inscripcion
    );
  }

  public deleteInscripcionById(id: number) {
    return this.httpClient.delete<Inscripcion>(
      this.apiEndpoint + `inscripciones/${id}`
    );
  }

  // Usuarios.
  public getUsuarios() {
    return this.httpClient.get<Usuario[]>(this.apiEndpoint + 'usuarios');
  }

  public addUsuario(nuevoUsuario: CreateUsuario) {
    return this.httpClient.post<Usuario>(
      this.apiEndpoint + 'usuarios',
      nuevoUsuario
    );
  }

  public getUsuarioById(id: number) {
    return this.httpClient.get<Usuario>(this.apiEndpoint + `usuarios/${id}`);
  }

  public getUsuarioByLoginId(loginId: string) {
    return this.getUsuarios().pipe(
      filter((x) => !!x),
      take(1),
      map((usuarios) => usuarios.find((u) => u.loginId === loginId))
    );
  }

  public editUsuario(usuario: Usuario) {
    return this.httpClient.put<Usuario>(
      this.apiEndpoint + `usuarios/${usuario.id}`,
      usuario
    );
  }

  public deleteUsuarioById(id: number) {
    return this.httpClient.delete<Usuario>(this.apiEndpoint + `usuarios/${id}`);
  }
}
