import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TitleTemplateStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  public override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`Proyecto final | ${title}`);
    }
  }
}
