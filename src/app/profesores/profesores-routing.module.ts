import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaProfesoresComponent } from './lista-profesores/lista-profesores.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProfesoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresRoutingModule {}
