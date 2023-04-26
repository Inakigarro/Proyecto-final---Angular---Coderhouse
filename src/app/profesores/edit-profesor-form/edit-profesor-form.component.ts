import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { ProfesoresService } from '../profesores.service';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/models/models';
import { PROFESORES_BASE_ROUTE } from '../base-route';

@Component({
  selector: 'app-edit-profesor-form',
  templateUrl: './edit-profesor-form.component.html',
})
export class EditProfesorFormComponent {
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
    private service: ProfesoresService,
    private route: ActivatedRoute
  ) {
    let profesor: Profesor | undefined;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      profesor = this.service.findProfesorById(this.id);
    });
    this.form = this.formBuilder.group({
      firstName: new FormControl(`${profesor?.firstName}`, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      lastName: new FormControl(`${profesor?.lastName}`, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      email: new FormControl(`${profesor?.email}`, [
        Validators.required,
        Validators.maxLength(150),
        Validators.email,
      ]),
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const data: Profesor = this.form.value;
      let profesor = this.service.findProfesorById(this.id);

      if (profesor) {
        this.service.modifyProfesor({
          ...data,
          id: profesor.id,
        });
      } else {
        console.error('Ha ocurrido un error al actualziar el profesor.');
      }
      this.service.navigate([PROFESORES_BASE_ROUTE], false);
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigate([PROFESORES_BASE_ROUTE], false);
  }
}
