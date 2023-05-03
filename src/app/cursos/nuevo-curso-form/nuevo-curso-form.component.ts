import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { CursosService } from '../cursos.service';
import { CreateCurso, Curso, Profesor } from 'src/app/models/models';
import { CURSOS_BASE_ROUTE } from '../base-route';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nuevo-curso-form',
  templateUrl: './nuevo-curso-form.component.html',
})
export class NuevoCursoFormComponent {
  public form: FormGroup;
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
        buttonType: 'submit',
        kind: 'basic',
        type: 'reset',
      },
      label: 'Cancelar',
    },
  ];
  public listaProfesores$ = this.service.profesores$;
  public profesorSelected: Profesor;
  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService
  ) {
    this.form = this.formBuilder.group({
      displayName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }
  public onSubmit() {
    if (this.form.valid) {
      const nuevoCurso: CreateCurso = this.form.value;
      nuevoCurso.profesorId = this.profesorSelected.id;
      this.service
        .addCurso(nuevoCurso)
        .pipe(filter((x) => !!x))
        .subscribe((data) => this.service.navigate([CURSOS_BASE_ROUTE], false));
    }
  }
  public onCancel() {
    this.form.reset();
    this.service.navigate([CURSOS_BASE_ROUTE], false);
  }
}
