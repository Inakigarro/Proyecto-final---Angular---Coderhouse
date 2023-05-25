import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { UsuariosService } from '../usuarios.service';
import { CreateUsuario } from 'src/app/models/models';
import { filter, tap } from 'rxjs';
import { USUARIOS_BASE_ROUTE } from '../base-route';
import { UsuariosActions } from '../+state/usuarios.actions';

@Component({
  selector: 'app-nuevo-usuario-form',
  templateUrl: './nuevo-usuario-form.component.html',
})
export class NuevoUsuarioFormComponent {
  public form: FormGroup;
  public buttons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'submit',
        kind: 'raised',
        type: 'submit',
      },
      label: 'Guardar',
    },
    {
      buttonDefinition: {
        buttonType: 'submit',
        kind: 'basic',
        type: 'reset',
      },
      label: 'Cancelar',
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private service: UsuariosService
  ) {
    this.form = this.formBuilder.group({
      loginId: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8),
      ]),
      rol: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const nuevoUsuario: CreateUsuario = this.form.value;
      this.service.dispatch(
        UsuariosActions.createUsuarioFormSubmitted({
          usuario: nuevoUsuario,
        })
      );
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigateToRoot();
  }
}
