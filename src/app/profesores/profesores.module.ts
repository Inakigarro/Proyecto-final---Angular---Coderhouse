import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProfesoresComponent } from './lista-profesores/lista-profesores.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from '../components/components.module';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfesoresComponent } from './profesores.component';
import { NuevoProfesorFormComponent } from './nuevo-profesor-form/nuevo-profesor-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfesorFormComponent } from './edit-profesor-form/edit-profesor-form.component';
import { FlexModule } from '@angular/flex-layout';

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
    ListaProfesoresComponent,
    ProfesoresComponent,
    NuevoProfesorFormComponent,
    EditProfesorFormComponent,
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ComponentsModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
  ],
})
export class ProfesoresModule {}
