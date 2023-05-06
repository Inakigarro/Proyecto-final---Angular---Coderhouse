import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { CursosService } from '../cursos.service';
import { Alumno, Curso, Inscripcion, Profesor } from 'src/app/models/models';
import { CURSOS_BASE_ROUTE } from '../base-route';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-editar-curso-form',
  templateUrl: './editar-curso-form.component.html',
})
export class EditarCursoFormComponent implements OnInit {
  public form: FormGroup;
  // Form controls.
  public displayNameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
  ]);
  public idFormControl = new FormControl(0, [Validators.required]);
  public inscripcionesFormCotrol = new FormControl<number[]>([], []);

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
  public alumnosInscriptos: number[] = [];
  private id: string = '';
  public profesorSelected: Profesor;
  public currentCurso: Curso | undefined;
  public cursoLoaded = false;
  public profesorLoaded: boolean;

  public alumnosDataSource = new MatTableDataSource<Alumno>();
  public headers = ['nombre', 'apellido', 'correo'];
  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: this.idFormControl,
      displayName: this.displayNameFormControl,
      inscripciones: this.inscripcionesFormCotrol,
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.service.findCursoById(this.id).subscribe((curso) => {
      this.displayNameFormControl.setValue(curso.displayName);
      this.idFormControl.setValue(curso.id);
      this.inscripcionesFormCotrol.setValue(curso.inscripciones);
      this.currentCurso = curso;
      this.cursoLoaded = true;

      this.service.findProfesorById(curso.id).subscribe((profesor) => {
        this.profesorSelected = profesor;
        this.profesorLoaded = true;
      });

      this.service.getInscripcionesByCursoId(curso.id).subscribe((ins) => {
        this.alumnosInscriptos = ins.map((i) => i.alumnoId);
        this.service
          .getAlumnosInscriptos(this.alumnosInscriptos)
          .subscribe((alumnos) => {
            this.alumnosDataSource.data = alumnos;
          });
      });
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const data: Curso = this.form.value;
      data.profesorId = this.profesorSelected.id;
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

  public comparator(a: Profesor, b: Profesor) {
    return a && b ? a.id === b.id : a === b;
  }
}
