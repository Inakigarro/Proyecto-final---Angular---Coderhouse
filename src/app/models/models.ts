export interface Alumno {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CreateAlumno {
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

export interface CreateProfesor {
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

export interface CreateCurso {
  displayName: string;
  profesorId: number;
  inscripciones: number[];
}

export interface Inscripcion {
  id: number;
  cursoId: number;
  alumnoId: number;
}

export interface CreateInscripcion {
  cursoId: number;
  alumnoId: number;
}

export interface InscripcionDto {
  id: number;
  curso?: Curso;
  alumno?: Alumno;
}

export interface Usuario {
  id: number;
  loginId: string;
  password: string;
}

export interface CreateUsuario {
  loginId: string;
  password: string;
}
