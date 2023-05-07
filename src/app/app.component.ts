import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {}
  title = 'proyecto-final';
}
