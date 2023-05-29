import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService
      .getCurrentUser()
      .pipe(
        map((user) =>
          user?.rol === 'admin' ? true : this.router.createUrlTree(['alumnos'])
        )
      );
  }
}
