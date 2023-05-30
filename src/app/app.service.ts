import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public title$ = new BehaviorSubject<string>(
    this.title.getTitle()
  ).asObservable();
  constructor(private router: Router, private title: Title) {}

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
