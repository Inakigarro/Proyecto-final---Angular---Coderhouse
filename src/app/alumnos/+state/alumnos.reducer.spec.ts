import { Alumno } from 'src/app/models/models';
import { AlumnosState, alumnosReducer, initialState } from './alumnos.reducer';
import { AlumnosActions } from './alumnos.actions';

const alumno: Alumno = {
  id: 1,
  firstName: 'Iñaki',
  lastName: 'Garro',
  email: 'email@email.com',
  phone: '123',
};

describe('Alumnos Reducer', () => {
  it('requestAlumnosList should set alumnosListLoaded false', () => {
    const state: AlumnosState = {
      alumnosListLoaded: true,
      currentAlumnoLoaded: false,
    };

    const action = AlumnosActions.requestAlumnosList();
    const result = alumnosReducer(state, action);

    expect(result.alumnosListLoaded).toBe(false);
  });
  it('alumnosListObtained should set alumnosListLoaded true and listaAlumnos', () => {
    const action = AlumnosActions.alumnosListObtained({
      alumnosList: [alumno],
    });
    const result = alumnosReducer(initialState, action);

    expect(result.alumnosListLoaded).toBe(true);
    expect(result.listaAlumnos).toBeTruthy();
    expect(result.listaAlumnos?.length).toBeGreaterThan(0);
  });
});
