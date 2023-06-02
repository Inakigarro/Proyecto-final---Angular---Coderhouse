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
import { StoreModule } from '@ngrx/store';
import {
  PROFESORES_FEATURE_KEY,
  profesoresReducer,
} from './+state/profesores.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfesoresEffects } from './+state/profesores.effects';
import { DetalleProfesorComponent } from './detalle-profesor/detalle-profesor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationModule } from '../authentication/authentication.module';

const MaterialModules = [
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    ListaProfesoresComponent,
    ProfesoresComponent,
    NuevoProfesorFormComponent,
    EditProfesorFormComponent,
    DetalleProfesorComponent,
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ComponentsModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    AuthenticationModule,
    StoreModule.forFeature(PROFESORES_FEATURE_KEY, profesoresReducer),
    EffectsModule.forFeature([ProfesoresEffects]),
  ],
})
export class ProfesoresModule {}
