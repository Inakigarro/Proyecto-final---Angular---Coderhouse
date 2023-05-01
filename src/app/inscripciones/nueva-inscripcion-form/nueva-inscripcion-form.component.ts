import { Component } from '@angular/core';
import { InscripcionesService } from '../inscripciones.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Alumno, Curso, Inscripcion } from 'src/app/models/models';
import { MatSelectChange } from '@angular/material/select';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { INSCRIPCIONES_BASE_ROUTE } from '../base-route';

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
      email: new FormControl(),
      phone: new FormControl(),
    });
    this.cursoFormGroup = this.formBuilder.group({
      profesor: new FormControl(),
    });
  }

  public onAlumnoSelected() {
    this.alumnoFormGroup.setValue({
      email: this.alumnoSelected.email,
      phone: this.alumnoSelected.phone,
    });
  }

  public onCursoSelected() {
    this.cursoFormGroup.setValue({
      profesor: `${this.cursoSelected.profesor.firstName} ${this.cursoSelected.profesor.lastName}`,
    });
  }

  public onSubmit() {
    let inscripcion: Inscripcion = {
      id: this.service.getInscripcionId(),
      alumno: this.alumnoSelected,
      curso: this.cursoSelected,
    };
    this.service.addInscripcion(inscripcion);
    this.service.addIncripcionToCurso(inscripcion);
    this.service.navigate([INSCRIPCIONES_BASE_ROUTE], false);
  }

  public onCancel() {
    this.alumnoFormGroup.reset();
    this.cursoFormGroup.reset();
    this.service.navigate([INSCRIPCIONES_BASE_ROUTE], false);
  }
}
