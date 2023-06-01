import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionDetallesComponent } from './inscripcion-detalles/inscripcion-detalles.component';
import { FlexModule } from '@angular/flex-layout';
import { NuevaInscripcionFormComponent } from './nueva-inscripcion-form/nueva-inscripcion-form.component';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import {
  INSCRIPCIONES_FEATURE_KEY,
  inscripcionesReducer,
} from './+state/inscripciones.reducer';
import { EffectSources, EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './+state/inscripciones.effects';

const MaterialModules = [
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
];

@NgModule({
  declarations: [
    InscripcionesComponent,
    ListaInscripcionesComponent,
    InscripcionDetallesComponent,
    NuevaInscripcionFormComponent,
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MaterialModules,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    StoreModule.forFeature(INSCRIPCIONES_FEATURE_KEY, inscripcionesReducer),
    EffectsModule.forFeature([InscripcionesEffects]),
  ],
})
export class InscripcionesModule {}
