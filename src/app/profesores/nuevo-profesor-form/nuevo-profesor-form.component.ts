import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { ProfesoresService } from '../profesores.service';
import { PROFESORES_BASE_ROUTE } from '../base-route';
import { Profesor } from 'src/app/models/models';

@Component({
  selector: 'app-nuevo-profesor-form',
  templateUrl: './nuevo-profesor-form.component.html',
})
export class NuevoProfesorFormComponent implements OnInit {
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
    private service: ProfesoresService
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
    });
  }
  public onSubmit() {
    if (this.form.valid) {
      const nuevoProfesor: Profesor = this.form.value;
      nuevoProfesor.id = this.service.getNewProfesorId();
      this.service.addProfesor(nuevoProfesor);
      this.service.navigate([PROFESORES_BASE_ROUTE], false);
    }
  }
  public onCancel() {
    this.form.reset();
    this.service.navigate([PROFESORES_BASE_ROUTE], false);
  }
  ngOnInit() {}
}
