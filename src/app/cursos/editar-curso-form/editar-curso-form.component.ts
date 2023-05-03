import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { CursosService } from '../cursos.service';
import { Curso, Profesor } from 'src/app/models/models';
import { CURSOS_BASE_ROUTE } from '../base-route';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-editar-curso-form',
  templateUrl: './editar-curso-form.component.html',
})
export class EditarCursoFormComponent {
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
  private id: string = '';
  public profesorSelected: Profesor;

  public loaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.service
      .findCursoById(this.id)
      .pipe(filter((x) => !!x))
      .subscribe((curso) => {
        this.form = this.formBuilder.group({
          id: new FormControl(`${curso.id}`, [Validators.required]),
          displayName: new FormControl(`${curso?.displayName}`, [
            Validators.required,
            Validators.maxLength(30),
          ]),
        });
        this.service
          .findProfesorById(curso.profesorId)
          .pipe(filter((x) => !!x))
          .subscribe((profesor) => {
            this.profesorSelected = profesor;
            this.loaded = true;
          });
      });
  }
  public onSubmit() {
    if (this.form.valid) {
      const data: Curso = this.form.value;
      this.service
        .modifyCurso(data)
        .pipe(filter((x) => !!x))
        .subscribe((data) => this.service.navigate([CURSOS_BASE_ROUTE], false));
    }
  }
  public onCancel() {
    this.form.reset();
    this.service.navigate([CURSOS_BASE_ROUTE], false);
  }
}
