import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from './button/button.component';
import { ListButtonComponent } from './list-button/list-button.component';

const MaterialModules = [
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [ListComponent, ButtonComponent, ListButtonComponent],
  imports: [CommonModule, MaterialModules],
  exports: [ListComponent, ButtonComponent, ListButtonComponent],
})
export class ComponentsModule {}
