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
  public loaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: AlumnosService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.service
      .findAlumnoById(this.id)
      .pipe(filter((x) => !!x))
      .subscribe((alumno) => {
        this.form = this.formBuilder.group({
          id: new FormControl(`${alumno.id}`, [Validators.required]),
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

        this.loaded = true;
      });
  }

  public onSubmit() {
    if (this.form.valid) {
      const data: Alumno = this.form.value;
      this.service
        .modifyAlumno(data)
        .pipe(filter((x) => !!x))
        .subscribe((data) =>
          this.service.navigate([ALUMNOS_BASE_ROUTE], false)
        );
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigate([ALUMNOS_BASE_ROUTE], false);
  }
}
