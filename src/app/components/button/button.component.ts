import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicButtonDefinition } from '../models/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public button: BasicButtonDefinition;

  @Input()
  public disabled = false;

  @Input()
  public label?: string;

  @Input()
  public icon?: string;

  @Input()
  public url?: string;

  @Output()
  public executed = new EventEmitter<string>();
}
