import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { AuthActions } from '../+state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public buttons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'submit',
        kind: 'raised',
        type: 'submit',
      },
      label: 'Enviar',
    },
    {
      buttonDefinition: {
        buttonType: 'submit',
        kind: 'raised',
        type: 'reset',
      },
      label: 'Cancelar',
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      loginId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    if (this.loginFormGroup.valid) {
      let loginId = this.loginFormGroup.get('loginId')?.value;
      let password = this.loginFormGroup.get('password')?.value;
      this.service.dispatch(
        AuthActions.requestLogin({
          loginId,
          password,
        })
      );
    }
  }

  public onCancel() {
    this.loginFormGroup.reset();
  }

  ngOnInit(): void {
    this.service.dispatch(AuthActions.initAuth());
  }
}
