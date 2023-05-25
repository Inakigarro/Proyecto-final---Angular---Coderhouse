import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { Alumno } from 'src/app/models/models';
import { ALUMNOS_BASE_ROUTE } from '../base-route';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../alumnos.service';
import { filter } from 'rxjs';
import { AlumnosActions } from '../+state/alumnos.actions';

@Component({
  selector: 'app-edit-alumno-form',
  templateUrl: './edit-alumno-form.component.html',
})
export class EditAlumnoFormComponent {
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
        buttonType: 'normal',
        kind: 'basic',
        type: 'reset',
      },
      label: 'Cancelar',
    },
  ];
  public currentAlumno$ = this.service.currentAlumno$;
  constructor(
    private formBuilder: FormBuilder,
    private service: AlumnosService
  ) {
    this.currentAlumno$.pipe(filter((x) => !!x)).subscribe((alumno) => {
      this.form = this.formBuilder.group({
        id: new FormControl(alumno?.id, [Validators.required]),
        firstName: new FormControl(`${alumno?.firstName}`, [
          Validators.required,
          Validators.maxLength(30),
        ]),
        lastName: new FormControl(`${alumno?.lastName}`, [
          Validators.required,
          Validators.maxLength(30),
        ]),
        email: new FormControl(`${alumno?.email}`, [
          Validators.required,
          Validators.maxLength(150),
          Validators.email,
        ]),
        phone: new FormControl(`${alumno?.phone}`, [
          Validators.required,
          Validators.maxLength(20),
        ]),
      });
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const data: Alumno = this.form.value;
      this.service.dispatch(
        AlumnosActions.editAlumnoFormSubmitted({
          alumno: data,
        })
      );
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigate([ALUMNOS_BASE_ROUTE], false);
  }
}
