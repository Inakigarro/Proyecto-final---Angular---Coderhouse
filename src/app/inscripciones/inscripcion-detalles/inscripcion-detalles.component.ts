import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InscripcionesService } from '../inscripciones.service';
import { ActivatedRoute } from '@angular/router';
import { Inscripcion } from 'src/app/models/models';

@Component({
  selector: 'app-inscripcion-detalles',
  templateUrl: './inscripcion-detalles.component.html',
  styleUrls: ['./inscripcion-detalles.component.scss'],
})
export class InscripcionDetallesComponent {
  public alumnoFormGroup: FormGroup;
  public cursoFormGroup: FormGroup;

  private id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: InscripcionesService,
    private route: ActivatedRoute
  ) {
    let inscripcion: Inscripcion | undefined;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      inscripcion = this.service.findInscripcionById(this.id);
    });

    this.alumnoFormGroup = this.formBuilder.group({
      displayName: new FormControl(
        `${inscripcion?.alumno.firstName} ${inscripcion?.alumno.lastName}`
      ),
      email: new FormControl(`${inscripcion?.alumno.email}`),
      phone: new FormControl(`${inscripcion?.alumno.phone}`),
    });
    this.cursoFormGroup = this.formBuilder.group({
      displayName: new FormControl(`${inscripcion?.curso.displayName}`),
      profesor: new FormControl(
        `${inscripcion?.curso.profesor.firstName} ${inscripcion?.curso.profesor.lastName}`
      ),
    });
  }
}
