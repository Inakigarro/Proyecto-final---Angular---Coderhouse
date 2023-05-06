import { Component } from '@angular/core';
import { InscripcionesService } from '../inscripciones.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Alumno,
  CreateInscripcion,
  Curso,
  Inscripcion,
} from 'src/app/models/models';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { INSCRIPCIONES_BASE_ROUTE } from '../base-route';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nueva-inscripcion-form',
  templateUrl: './nueva-inscripcion-form.component.html',
  styleUrls: ['./nueva-inscripcion-form.component.scss'],
})
export class NuevaInscripcionFormComponent {
  public listaAlumnos = this.service.alumnos$;
  public listaCursos = this.service.cursos$;

  public alumnoFormGroup: FormGroup;
  public alumnoSelected: Alumno;

  public cursoFormGroup: FormGroup;
  public cursoSelected: Curso;

  public buttons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'submit',
        kind: 'raised',
        type: 'submit',
      },
      label: 'Guardar',
    },
    {
      buttonDefinition: {
        buttonType: 'normal',
        kind: 'basic',
        type: 'reset',
      },
      label: 'Cancelar',
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private service: InscripcionesService
  ) {
    this.alumnoFormGroup = this.formBuilder.group({
      id: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
    });
    this.cursoFormGroup = this.formBuilder.group({
      id: new FormControl(),
      profesor: new FormControl(),
    });
  }

  public onAlumnoSelected() {
    this.alumnoFormGroup.setValue({
      id: this.alumnoSelected.id,
      email: this.alumnoSelected.email,
      phone: this.alumnoSelected.phone,
    });
  }

  public onCursoSelected() {
    this.service
      .findProfesorById(this.cursoSelected.profesorId)
      .pipe(filter((x) => !!x))
      .subscribe((profesor) =>
        this.cursoFormGroup.setValue({
          id: this.cursoSelected.id,
          profesor: `${profesor.firstName} ${profesor.lastName}`,
        })
      );
  }

  public onSubmit() {
    let inscripcion: CreateInscripcion = {
      alumnoId: this.alumnoSelected.id,
      cursoId: this.cursoSelected.id,
    };
    this.service.addInscripcion(inscripcion).subscribe((data) => {
      this.service.addIncripcionToCurso(data);
      this.service.navigate([INSCRIPCIONES_BASE_ROUTE], false);
    });
  }

  public onCancel() {
    this.alumnoFormGroup.reset();
    this.cursoFormGroup.reset();
    this.service.navigate([INSCRIPCIONES_BASE_ROUTE], false);
  }
}
