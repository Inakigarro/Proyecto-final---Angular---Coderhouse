import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, withLatestFrom } from 'rxjs';
import { Usuario } from '../models/models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);
  private apiUrl = 'https://64504de6a322196911485862.mockapi.io/api/usuarios';
  constructor(private httpClient: HttpClient, private router: Router) {
    const currentUser = JSON.parse(
      localStorage.getItem('token') as string
    ) as Usuario;
    if (currentUser) {
      this.authUser$.next(currentUser);
    } else {
      this.authUser$.next(null);
    }
  }

  public getCurrentUser() {
    return this.authUser$.asObservable();
  }

  public login(loginId: string, password: string) {
    this.httpClient.get<Usuario[]>(this.apiUrl).subscribe((usuarios) => {
      let currentUser = usuarios.find((x) => x.loginId === loginId);
      if (currentUser) {
        if (currentUser?.password === password) {
          localStorage.setItem('token', JSON.stringify(currentUser));
          this.authUser$.next(currentUser);
          this.router.navigate(['alumnos']);
        }
      }
    });
  }

  public logout() {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  public verifyToken() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    return this.httpClient.get<Usuario[]>(this.apiUrl).pipe(
      withLatestFrom(this.authUser$),
      map(([usuarios, authUser]) => {
        const currentUser = usuarios.find((user) => user?.id === authUser?.id);
        if (currentUser) {
          localStorage.setItem('token', JSON.stringify(currentUser));
          this.authUser$.next(currentUser);
        }

        return !!currentUser;
      })
    );
  }
}
