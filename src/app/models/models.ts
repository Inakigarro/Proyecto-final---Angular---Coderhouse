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
  profesorId: number;
  inscripciones: number[];
}

export interface Inscripcion {
  id: number;
  curso: Curso;
  alumno: Alumno;
}
