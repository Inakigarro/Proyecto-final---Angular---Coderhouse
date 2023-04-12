import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicButtonDefinition } from '../models/button';

@Component({
  selector: 'app-list-button',
  templateUrl: './list-button.component.html',
  styleUrls: ['./list-button.component.scss'],
})
export class ListButtonComponent {
  @Input()
  public button: BasicButtonDefinition;

  @Input()
  public disabled = false;

  @Input()
  public label?: string;

  @Input()
  public icon?: string;

  @Input()
  public id: number;

  @Output()
  public executed = new EventEmitter<number>();
}
