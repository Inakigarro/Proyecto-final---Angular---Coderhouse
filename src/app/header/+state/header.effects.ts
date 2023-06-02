import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { delay, map, switchMap } from 'rxjs';
import { RouterService } from 'src/app/router/router.service';
import { updateTitle } from './header.actions';
import { Title } from '@angular/platform-browser';

@Injectable()
export class HeaderEffects {
  public setCurrentTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap(() => this.routerService.routerUrl$),
      delay(500),
      map(() =>
        updateTitle({
          title: this.title.getTitle(),
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly routerService: RouterService,
    private title: Title
  ) {}
}
