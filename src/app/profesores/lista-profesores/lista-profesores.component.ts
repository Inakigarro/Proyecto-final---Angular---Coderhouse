import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, filter } from 'rxjs';
import {
  BasicButtonDefinition,
  ExtendedButtonDefinition,
  ListButtonDefinition,
} from 'src/app/components/models/button';
import { ProfesoresService } from '../profesores.service';
import { Profesor } from 'src/app/models/models';
import { ProfesoresActions } from '../+state/profesores.actions';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.scss'],
})
export class ListaProfesoresComponent implements OnDestroy {
  public destroy$ = new Subject();
  public data$ = this.service.profesores$;
  public headers: string[] = ['id', 'nombre', 'apellido', 'correo', 'botones'];
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
  public dataSource = new MatTableDataSource<Profesor>();
  public loaded = false;
  constructor(private service: ProfesoresService) {
    this.data$.subscribe((profesores) => {
      this.dataSource.data = profesores;
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onEditButtonClicked(id: number) {
    this.service.navigate(['editar', `${id}`], true);
  }
  public onDeleteButtonClicked(id: number) {
    this.loaded = false;
    this.service
      .deleteProfesorById(id)
      .pipe(filter((x) => !!x))
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter((x) => x.id !== id);
      });
  }

  public navigate(url: string) {
    this.service.navigate([url], true);
  }

  public dispatch(id: number, button: BasicButtonDefinition) {
    if (button.kind === 'raised') {
      this.service.dispatch(
        ProfesoresActions.editProfesorButtonClicked({
          profesorId: id,
        })
      );
    }
    if (button.kind === 'fab') {
      this.service.dispatch(
        ProfesoresActions.editProfesorButtonClicked({
          profesorId: id,
        })
      );
    }
  }
}
