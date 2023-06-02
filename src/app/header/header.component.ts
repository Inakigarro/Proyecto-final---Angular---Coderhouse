import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Title } from '@angular/platform-browser';
import { Subject, delay, filter, map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCurrentTitle } from './+state/header.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public appTitle = this.store.select(getCurrentTitle);
  public headaerTitle: string = '';
  constructor(
    private authService: AuthenticationService,
    private store: Store
  ) {
    this.appTitle
      .pipe(
        withLatestFrom(this.authService.userLoggedIn$),
        map(([title, user]) => {
          if (user) {
            this.headaerTitle = title + ` | ${user.loginId}`;
          } else {
            this.headaerTitle = title;
          }
        })
      )
      .subscribe();
  }

  public endSession() {
    this.authService.logout();
  }
}
