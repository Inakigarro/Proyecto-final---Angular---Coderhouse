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

@Component({
  selector: 'app-edit-alumno-form',
  templateUrl: './edit-alumno-form.component.html',
  styleUrls: ['./edit-alumno-form.component.scss'],
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
      label: 'Save',
    },
    {
      buttonDefinition: {
        buttonType: 'normal',
        kind: 'basic',
        type: 'reset',
      },
      label: 'Cancel',
    },
  ];
  private id: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private service: AlumnosService,
    private route: ActivatedRoute
  ) {
    let alumno: Alumno | undefined;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      alumno = this.service.findAlumnoById(this.id);
    });

    this.form = this.formBuilder.group({
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
  }

  public onSubmit() {
    if (this.form.valid) {
      const data: Alumno = this.form.value;
      let alumno = this.service.findAlumnoById(this.id);

      if (alumno) {
        this.service.modifyAlumno({
          ...data,
          id: alumno.id,
        });
      } else {
        console.error('Ha ocurrido un error al actualziar el alumno.');
      }
      this.service.navigate([ALUMNOS_BASE_ROUTE], false);
    }
  }
  public onCancel() {
    this.form.reset();
    this.service.navigate([ALUMNOS_BASE_ROUTE], false);
    this.service.inEditionForm = false;
  }
}
