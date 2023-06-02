import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import {
  USUARIOS_FEATURE_KEY,
  usuariosReducer,
} from './+state/usuarios.reducer';
import { ComponentsModule } from '../components/components.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosEffects } from './+state/usuarios.effects';
import { NuevoUsuarioFormComponent } from './nuevo-usuario-form/nuevo-usuario-form.component';
import { EditUsuarioFormComponent } from './edit-usuario-form/edit-usuario-form.component';
import { MatSelectModule } from '@angular/material/select';

const MaterialModules = [
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
];

@NgModule({
  declarations: [
    ListaUsuariosComponent,
    UsuariosComponent,
    NuevoUsuarioFormComponent,
    EditUsuarioFormComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModules,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    FlexModule,
    StoreModule.forFeature(USUARIOS_FEATURE_KEY, usuariosReducer),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
})
export class UsuariosModule {}
