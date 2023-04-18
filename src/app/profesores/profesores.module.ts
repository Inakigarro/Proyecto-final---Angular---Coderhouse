import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProfesoresComponent } from './lista-profesores/lista-profesores.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from '../components/components.module';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialModules = [
  MatTableModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [ListaProfesoresComponent],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    ComponentsModule,
    MaterialModules,
  ],
})
export class ProfesoresModule {}
