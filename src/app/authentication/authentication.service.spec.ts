import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Usuario } from '../models/models';
import { Router } from '@angular/router';

const adminUserMock: Usuario = {
  id: 1,
  loginId: 'admin',
  password: 'admin',
};

describe('Authentication Service', () => {
  let service: AuthenticationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => of([adminUserMock]),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });

    service = TestBed.inject(AuthenticationService);
  });

  it('When login is called, with valid loginId and password, should set currentUser in localStorage', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.login('admin', 'admin');
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('When getCurrentUser is called, should return the current user authenticated.', () => {
    service.login('admin', 'admin');
    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual(adminUserMock);
    });
  });
});
