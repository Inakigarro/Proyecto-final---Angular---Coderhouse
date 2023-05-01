export interface Alumno {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Profesor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Curso {
  id: number;
  displayName: string;
  profesor: Profesor;
  inscripciones: number[];
}

export interface Inscripcion {
  id: number;
  curso: Curso;
  alumno: Alumno;
}
