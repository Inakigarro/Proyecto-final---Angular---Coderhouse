import { NgModule } from '@angular/core';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ComponentsModule } from '../components/components.module';
import { NuevoAlumnoFormComponent } from './nuevo-alumno-form/nuevo-alumno-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditAlumnoFormComponent } from './edit-alumno-form/edit-alumno-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlumnosComponent } from './alumnos.component';

const MaterialModules = [
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    ListaAlumnosComponent,
    NuevoAlumnoFormComponent,
    EditAlumnoFormComponent,
    AlumnosComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    ComponentsModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AlumnosModule {}
