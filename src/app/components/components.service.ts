import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  constructor(private router: Router) {}

  public deleteItem<TItem extends { id: number }>(items: TItem[], id: number) {
    let indextToRemove = items.findIndex((x) => x.id === id);
    items.splice(indextToRemove, 1);
    return items;
  }

  public navigate(url: string[], isRelative: boolean) {
    let urlArray: string[] = [];
    if (isRelative) {
      urlArray.push(this.router.url);
      url.forEach((x) => urlArray.push(x));
      this.router.navigate(urlArray);
    } else {
      url.forEach((x) => urlArray.push(x));
      this.router.navigate(url);
    }
  }
}
