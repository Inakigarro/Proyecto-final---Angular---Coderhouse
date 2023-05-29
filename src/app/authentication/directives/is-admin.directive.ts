import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { filter, map } from 'rxjs';

@Directive({ selector: '[isAdmin]' })
export class IsAdminDirective {
  private currentUser$ = this.authService.getCurrentUser();
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService
  ) {}

  @Input() set isAdmin(rol: string) {
    this.currentUser$
      .pipe(
        filter((user) => !!user),
        map((user) => {
          if (user?.rol === rol && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (user?.rol !== rol && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        })
      )
      .subscribe();
  }
}
