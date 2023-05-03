import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InscripcionesService } from '../inscripciones.service';
import { ActivatedRoute } from '@angular/router';
import { Inscripcion } from 'src/app/models/models';
import { filter, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-inscripcion-detalles',
  templateUrl: './inscripcion-detalles.component.html',
  styleUrls: ['./inscripcion-detalles.component.scss'],
})
export class InscripcionDetallesComponent {
  public alumnoFormGroup: FormGroup;
  public cursoFormGroup: FormGroup;

  private id: string = '';
  public loaded = false;
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
        alumnoId = data.alumnoId;
        cursoId = data.cursoId;
      });

    if (alumnoId !== 0) {
      this.service
        .findAlumnoById(alumnoId)
        .pipe(filter((x) => !!x))
        .subscribe(
          (alumno) =>
            (this.alumnoFormGroup = this.formBuilder.group({
              id: new FormControl(`${alumno.id}`),
              displayName: new FormControl(
                `${alumno.firstName} ${alumno.lastName}`
              ),
              email: new FormControl(`${alumno.email}`),
              phone: new FormControl(`${alumno.phone}`),
            }))
        );
    }

    if (cursoId !== 0) {
      this.service
        .findCursoById(cursoId)
        .pipe(filter((x) => !!x))
        .subscribe((curso) => {
          this.service
            .findProfesorById(curso.profesorId)
            .pipe(filter((x) => !!x))
            .subscribe(
              (profesor) =>
                (this.cursoFormGroup = this.formBuilder.group({
                  id: new FormControl(`${curso.id}`),
                  displayName: new FormControl(`${curso.displayName}`),
                  profesor: new FormControl(
                    `${profesor.firstName} ${profesor.lastName}`
                  ),
                }))
            );
        });
    }
  }
}
