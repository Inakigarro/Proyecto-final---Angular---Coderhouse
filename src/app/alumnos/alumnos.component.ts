import { Component } from '@angular/core';
import { AlumnosService } from './alumnos.service';
import { AlumnosActions } from './+state/alumnos.actions';

@Component({
  selector: 'app-alumnos',
  template: `<router-outlet></router-outlet>`,
})
export class AlumnosComponent {
  constructor() {}
}
