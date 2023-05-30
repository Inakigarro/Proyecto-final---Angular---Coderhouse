import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { NuevoCursoFormComponent } from './nuevo-curso-form/nuevo-curso-form.component';
import { EditarCursoFormComponent } from './editar-curso-form/editar-curso-form.component';
import { FlexModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { StoreModule } from '@ngrx/store';
import { CURSOS_FEATURE_KEY, cursosReducer } from './+state/cursos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './+state/cursos.effects';
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
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    CursosComponent,
    ListaCursosComponent,
    NuevoCursoFormComponent,
    EditarCursoFormComponent,
    DetalleCursoComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ComponentsModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    AuthenticationModule,
    StoreModule.forFeature(CURSOS_FEATURE_KEY, cursosReducer),
    EffectsModule.forFeature([CursosEffects]),
  ],
})
export class CursosModule {}
