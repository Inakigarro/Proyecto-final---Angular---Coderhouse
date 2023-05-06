import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InscripcionesService } from '../inscripciones.service';
import { ActivatedRoute } from '@angular/router';
import { Inscripcion } from 'src/app/models/models';
import { filter, withLatestFrom } from 'rxjs';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { INSCRIPCIONES_BASE_ROUTE } from '../base-route';

@Component({
  selector: 'app-inscripcion-detalles',
  templateUrl: './inscripcion-detalles.component.html',
  styleUrls: ['./inscripcion-detalles.component.scss'],
})
export class InscripcionDetallesComponent {
  public alumnoFormGroup: FormGroup;
  public cursoFormGroup: FormGroup;

  private id: string = '';
  public alumnoLoaded = false;
  public cursoLoaded = false;

  public buttons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'submit',
        kind: 'raised',
        type: 'reset',
      },
      label: 'Volver',
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private service: InscripcionesService,
    private route: ActivatedRoute
  ) {
    let alumnoId = 0;
    let cursoId = 0;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.service
      .findInscripcionById(this.id)
      .pipe(filter((x) => !!x))
      .subscribe((data) => {
        this.service
          .findAlumnoById(data.alumnoId)
          .pipe(filter((x) => !!x))
          .subscribe((alumno) => {
            this.alumnoFormGroup = this.formBuilder.group({
              id: new FormControl(`${alumno.id}`),
              displayName: new FormControl({
                value: `${alumno.firstName} ${alumno.lastName}`,
                disabled: true,
              }),
              email: new FormControl({
                value: `${alumno.email}`,
                disabled: true,
              }),
              phone: new FormControl({
                value: `${alumno.phone}`,
                disabled: true,
              }),
            });
            this.alumnoLoaded = true;
          });
        this.service
          .findCursoById(data.cursoId)
          .pipe(filter((x) => !!x))
          .subscribe((curso) => {
            this.service
              .findProfesorById(curso.profesorId)
              .pipe(filter((x) => !!x))
              .subscribe((profesor) => {
                this.cursoFormGroup = this.formBuilder.group({
                  id: new FormControl(`${curso.id}`),
                  displayName: new FormControl({
                    value: curso.displayName,
                    disabled: true,
                  }),
                  profesor: new FormControl({
                    value: `${profesor.firstName} ${profesor.lastName}`,
                    disabled: true,
                  }),
                });
                this.cursoLoaded = true;
              });
          });
      });
  }

  public reset() {
    this.service.navigate([INSCRIPCIONES_BASE_ROUTE], false);
  }
}
