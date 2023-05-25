import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { ApiService } from '../api.service';
import * as UsuariosSelectors from './+state/usuarios.selectors';
import { Router } from '@angular/router';
import { CreateUsuario, Usuario } from '../models/models';
import { USUARIOS_BASE_ROUTE } from './base-route';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(
    private store: Store,
    private apiService: ApiService,
    private router: Router
  ) {}

  public getUsuarios() {
    return this.apiService.getUsuarios();
  }

  public getUsuarioById(id: number) {
    return this.apiService.getUsuarioById(id);
  }

  public addUsuario(nuevoUsuario: CreateUsuario) {
    return this.apiService.addUsuario(nuevoUsuario);
  }

  public editUsuario(usuario: Usuario) {
    return this.apiService.editUsuario(usuario);
  }

  public deleteUsuarioById(id: number) {
    return this.apiService.deleteUsuarioById(id);
  }

  public usuariosListLoaded$ = this.store.select(
    UsuariosSelectors.getUsuariosListLoaded
  );
  public usuariosList$ = this.store.select(UsuariosSelectors.getUsuariosList);
  public currentUsuarioLoaded$ = this.store.select(
    UsuariosSelectors.getCurrentUsuario
  );
  public currentUsuario$ = this.store.select(
    UsuariosSelectors.getCurrentUsuario
  );

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

  public navigateToRoot() {
    this.navigate([USUARIOS_BASE_ROUTE], false);
  }

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
