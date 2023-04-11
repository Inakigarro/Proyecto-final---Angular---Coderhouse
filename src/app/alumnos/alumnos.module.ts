import { NgModule } from '@angular/core';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from '../components/components.module';

const MaterialModules = [MatTableModule, MatToolbarModule];

@NgModule({
  declarations: [ListaAlumnosComponent],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    ComponentsModule,
    MaterialModules,
  ],
})
export class AlumnosModule {}
