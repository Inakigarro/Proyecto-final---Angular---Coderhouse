import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard  {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.verifyToken().pipe(
      map((user) => {
        if (user) {
          return this.router.createUrlTree(['alumnos']);
        } else {
          return true;
        }
      })
    );
  }
}
