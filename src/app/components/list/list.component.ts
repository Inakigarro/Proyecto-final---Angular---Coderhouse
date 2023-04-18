import { Component, Input } from '@angular/core';
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
  public headers: (keyof TItem)[];

  @Input()
  public items: TItem[];

  public dataSource = new MatTableDataSource<TItem[]>();

  constructor() {
    this.dataSource.data.push(this.items);
  }
}
