import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, take, withLatestFrom } from 'rxjs';
import { Usuario } from '../models/models';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import * as AuthSelectors from './+state/auth.selectors';
import { AuthActions } from './+state/auth.actions';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = 'https://64504de6a322196911485862.mockapi.io/api/usuarios';
  public userLoggedIn$ = this.store.select(AuthSelectors.getCurrentUser);
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store,
    private apiService: ApiService
  ) {}

  public login(loginId: string, password: string) {
    return this.httpClient.get<Usuario[]>(this.apiUrl).pipe(
      filter((x) => !!x),
      map((usuarios) => usuarios.find((u) => u.loginId === loginId))
    );
  }

  public logout() {
    this.store.dispatch(AuthActions.logoutUser());
  }

  public verifyToken() {
    let loginId = localStorage.getItem('loginId');

    if (loginId) {
      return this.apiService.getUsuarioByLoginId(loginId).pipe(
        filter((x) => !!x),
        take(1)
      );
    } else {
      return this.userLoggedIn$;
    }
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

  public dispatch = (action: Action) => this.store.dispatch(action);
}
