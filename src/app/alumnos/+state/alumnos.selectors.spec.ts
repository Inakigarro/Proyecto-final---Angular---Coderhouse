import { Alumno } from 'src/app/models/models';
import {
  ALUMNOS_FEATURE_KEY,
  AlumnosPartialState,
  AlumnosState,
} from './alumnos.reducer';
import * as AlumnosSelector from './alumnos.selectors';

const alumno: Alumno = {
  id: 1,
  firstName: 'Iñaki',
  lastName: 'Garro',
  email: 'email@email.com',
  phone: '123',
};

describe('Alumnos selectors', () => {
  const state: AlumnosState = {
    alumnosListLoaded: true,
    currentAlumnoLoaded: true,
    listaAlumnos: [alumno],
    currentAlumno: alumno,
  };

  const alumnosState: AlumnosPartialState = {
    [ALUMNOS_FEATURE_KEY]: state,
  };
  it('getAlumnoListLoaded should return true', () => {
    const result = AlumnosSelector.getAlumnoListLoaded(alumnosState);
    expect(result).toBe(true);
  });

  it('getAlumnoList should return the list of alumnos', () => {
    const result = AlumnosSelector.getAlumnosList(alumnosState);
    expect(result).toBeTruthy();
    expect(result?.length).toBeGreaterThan(0);
  });

  it('getCurrentAlumnoLoaded should return true', () => {
    const result = AlumnosSelector.getCurrentAlumnoLoaded(alumnosState);
    expect(result).toBe(true);
  });

  it('getCurrentAlumno should return current alumno', () => {
    const result = AlumnosSelector.getCurrentAlumno(alumnosState);
    expect(result).toEqual(alumno);
  });
});
