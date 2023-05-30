import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ComponentsModule } from '../components/components.module';
import { IsAdminDirective } from './directives/is-admin.directive';
import { StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_KEY, authReducer } from './+state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './+state/auth.effects';

const MaterialModule = [MatFormFieldModule, MatInputModule, MatCardModule];

@NgModule({
  declarations: [LoginComponent, IsAdminDirective],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  exports: [LoginComponent, IsAdminDirective],
})
export class AuthenticationModule {}
