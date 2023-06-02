import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as HeaderSelectors from './header/+state/header.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private router: Router) {}

  public navigate(url: string[], isRelative: boolean = false) {
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
