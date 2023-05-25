import { Component, OnDestroy } from '@angular/core';
import { Subject, filter, map } from 'rxjs';
import { UsuariosService } from '../usuarios.service';
import {
  BasicButtonDefinition,
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/models';
import { UsuariosActions } from '../+state/usuarios.actions';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnDestroy {
  public destroy$ = new Subject();
  public listLoaded$ = this.service.usuariosListLoaded$;
  public headers = ['id', 'loginId', 'rol', 'botones'];
  public toolbarButtons: ExtendedButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Nuevo',
      url: 'nuevo',
    },
  ];
  public listItemButtons: ListButtonDefinition[] = [
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'raised',
      },
      label: 'Editar',
    },
    {
      buttonDefinition: {
        buttonType: 'normal',
        type: 'basic',
        kind: 'fab',
      },
      icon: 'delete',
    },
  ];

  public dataSource = new MatTableDataSource<Usuario>();
  constructor(private service: UsuariosService) {
    this.service.usuariosList$
      .pipe(
        filter((x) => !!x),
        map((usuarios) => (this.dataSource.data = usuarios as Usuario[]))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }

  public dispatch(id: number, button: BasicButtonDefinition) {
    if (button.kind === 'basic') {
      this.service.navigate([`${id}`], true);
    }
    if (button.kind === 'raised') {
      this.service.navigate(['editar', `${id}`], true);
    }
    if (button.kind === 'fab') {
      this.service.dispatch(
        UsuariosActions.deleteUsuarioButtonClicked({
          usuarioId: id,
        })
      );
    }
  }
}
