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
import { filter } from 'rxjs';

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
  public currentProfesor$ = this.service.currentProfesor$;
  constructor(
    private formBuilder: FormBuilder,
    private service: ProfesoresService,
    private route: ActivatedRoute
  ) {
    this.currentProfesor$.pipe(filter((x) => !!x)).subscribe((profesor) => {
      this.form = this.formBuilder.group({
        id: new FormControl(`${profesor?.id}`, [Validators.required]),
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
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const data: Profesor = this.form.value;
      this.service
        .modifyProfesor(data)
        .pipe(filter((x) => !!x))
        .subscribe((data) =>
          this.service.navigate([PROFESORES_BASE_ROUTE], false)
        );
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigate([PROFESORES_BASE_ROUTE], false);
  }
}
