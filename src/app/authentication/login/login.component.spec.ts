import { AuthenticationModule } from '../authentication.module';
import { AuthenticationService } from '../authentication.service';
import { LoginComponent } from './login.component';
import { TestBed } from '@angular/core/testing';
import { Usuario } from 'src/app/models/models';

const userMock: Usuario = {
  id: 1,
  loginId: 'admin',
  password: 'admin',
};

describe('Login Component', () => {
  let loginComponent: LoginComponent;
  let authService: AuthenticationService;
  let itsVerified: boolean = true;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AuthenticationModule],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            login: () => {},
            verifyToken: () => itsVerified,
          },
        },
      ],
    });

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
    authService = TestBed.inject(AuthenticationService);
  });

  it('when component intilizes, formGroup should be invalid', () => {
    let formGroup = loginComponent.loginFormGroup;

    expect(formGroup.valid).toBe(false);
  });

  it('When onSubmit is called, with formGroup valid, login should been called.', () => {
    const submitSpy = spyOn(authService, 'login');
    loginComponent.loginFormGroup.setValue({
      loginId: 'admin',
      password: 'admin',
    });

    loginComponent.onSubmit();

    expect(submitSpy).toHaveBeenCalled();
    expect(loginComponent.loginFormGroup.valid).toBe(true);
  });

  it('when onCancel is called, formGroup should reset', () => {
    // Arrange.
    const formGroup = loginComponent.loginFormGroup;
    const resetSpy = spyOn(formGroup, 'reset');

    loginComponent.loginFormGroup.setValue({
      loginId: 'admin',
      password: 'admin',
    });
    expect(formGroup.valid).toBe(true);

    loginComponent.onCancel();

    expect(resetSpy).toHaveBeenCalled();
  });
});
