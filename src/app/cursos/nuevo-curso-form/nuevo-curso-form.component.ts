import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { CursosService } from '../cursos.service';
import { Curso } from 'src/app/models/models';
import { CURSOS_BASE_ROUTE } from '../base-route';

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
      const nuevoProfesor: Curso = this.form.value;
      nuevoProfesor.id = this.service.getNewCursoId();
      this.service.addCurso(nuevoProfesor);
      this.service.navigate([CURSOS_BASE_ROUTE], false);
    }
  }
  public onCancel() {
    this.form.reset();
    this.service.navigate([CURSOS_BASE_ROUTE], false);
  }
}
