import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExtendedButtonDefinition } from 'src/app/components/models/button';
import { UsuariosService } from '../usuarios.service';
import { CreateUsuario, Usuario } from 'src/app/models/models';
import { filter, tap } from 'rxjs';
import { USUARIOS_BASE_ROUTE } from '../base-route';
import { UsuariosActions } from '../+state/usuarios.actions';

@Component({
  selector: 'app-nuevo-usuario-form',
  templateUrl: './edit-usuario-form.component.html',
})
export class EditUsuarioFormComponent {
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
  public currentUsuario$ = this.service.currentUsuario$;
  constructor(
    private formBuilder: FormBuilder,
    private service: UsuariosService
  ) {
    this.currentUsuario$.pipe(filter((x) => !!x)).subscribe(
      (usuario) =>
        (this.form = this.formBuilder.group({
          id: new FormControl(usuario!.id, [Validators.required]),
          loginId: new FormControl(usuario!.loginId, [
            Validators.required,
            Validators.maxLength(15),
          ]),
          password: new FormControl(usuario?.password, [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(8),
          ]),
          rol: new FormControl(usuario!.rol, [Validators.required]),
        }))
    );
  }

  public onSubmit() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;
      this.service.dispatch(
        UsuariosActions.editUsuarioFormSubmitted({
          usuario: usuario,
        })
      );
    }
  }

  public onCancel() {
    this.form.reset();
    this.service.navigateToRoot();
  }
}
