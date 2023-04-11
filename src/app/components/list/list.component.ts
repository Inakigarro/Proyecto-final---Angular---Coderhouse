import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ExtendedButtonDefinition } from '../models/button';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<TItem> {
  @Input()
  public toolbarButtons: ExtendedButtonDefinition[];

  @Input()
  public headers: string[];

  @Input()
  public items: TItem[];

  public dataSource = new MatTableDataSource();

  constructor() {
    this.dataSource.data.push(this.items);
  }
}
