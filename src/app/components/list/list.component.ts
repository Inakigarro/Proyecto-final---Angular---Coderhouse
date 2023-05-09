import { Component, Input, OnInit } from '@angular/core';
import {
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from '../models/button';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentsService } from '../components.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<TItem extends object & { id: number }>
  implements OnInit
{
  @Input()
  public toolbarButtons: ExtendedButtonDefinition[];

  @Input()
  public listItemButtons: ListButtonDefinition[];

  public headers: string[] = [];

  @Input()
  public items: TItem[];

  public dataSource = new MatTableDataSource();

  constructor(private service: ComponentsService) {
    this.dataSource.data.push(this.items);
  }
  ngOnInit(): void {
    if (this.items.length > 0) {
      this.headers = Object.keys(this.items[0]);
    }
  }
  public getValueOfProperty(element: TItem, property: string) {
    return (element as any)[property];
  }

  public onEditButtonClicked(id: number) {
    this.service.navigate(['editar', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.dataSource.data = this.service.deleteItem(this.items, id);
  }
  public navigate(event: string) {
    this.service.navigate([event], true);
  }
}
