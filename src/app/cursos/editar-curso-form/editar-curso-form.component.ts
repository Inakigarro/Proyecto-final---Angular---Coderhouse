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
import { ActivatedRoute } from '@angular/router';

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
  private id: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private route: ActivatedRoute
  ) {
    let curso: Curso | undefined;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      curso = this.service.findCursoById(this.id);
    });
    this.form = this.formBuilder.group({
      displayName: new FormControl(`${curso?.displayName}`, [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }
  public onSubmit() {
    if (this.form.valid) {
      const data: Curso = this.form.value;
      let curso = this.service.findCursoById(this.id);

      if (curso) {
        this.service.modifyCurso({
          ...data,
          id: curso.id,
        });
      } else {
        console.error('Ha ocurrido un error al actualziar el curso.');
      }
      this.service.navigate([CURSOS_BASE_ROUTE], false);
    }
  }
  public onCancel() {
    this.form.reset();
    this.service.navigate([CURSOS_BASE_ROUTE], false);
  }
}
