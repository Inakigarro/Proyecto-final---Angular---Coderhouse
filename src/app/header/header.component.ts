import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Title } from '@angular/platform-browser';
import { Subject, delay, filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public headaerTitle: string = '';
  constructor(
    private authService: AuthenticationService,
    private title: Title
  ) {
    this.authService
      .getCurrentUser()
      .pipe(
        delay(250),
        map((user) => {
          this.headaerTitle = this.title.getTitle();
          if (user) {
            this.headaerTitle = this.headaerTitle + ` | ${user?.loginId}`;
          }
        })
      )
      .subscribe();
  }

  public endSession() {
    this.authService.logout();
  }
}
