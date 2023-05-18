import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { Alumno, CreateAlumno } from 'src/app/models/models';
import { ALUMNOS_BASE_ROUTE } from '../base-route';
import { AlumnosService } from '../alumnos.service';
import { filter } from 'rxjs';
import { AlumnosActions } from '../+state/alumnos.actions';
@Component({
  selector: 'app-nuevo-alumno-form',
  templateUrl: './nuevo-alumno-form.component.html',
  styleUrls: ['./nuevo-alumno-form.component.scss'],
})
export class NuevoAlumnoFormComponent {
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
    private service: AlumnosService
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
        Validators.email,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const nuevoAlumno: CreateAlumno = this.form.value;
      this.service.dispatch(
        AlumnosActions.createAlumnoFormSubmitted({
          alumno: nuevoAlumno,
        })
      );
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigate([ALUMNOS_BASE_ROUTE], false);
  }
}
