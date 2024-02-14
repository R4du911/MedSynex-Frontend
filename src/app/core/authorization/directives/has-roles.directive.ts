import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {ERole} from "../../../user/model/ERole";
import {Subject, takeUntil} from "rxjs";
import {AuthorizationService} from "../service/authorization.service";

@Directive({
  selector: '[hasRoles]',
  standalone: true
})
export class HasRolesDirective implements OnDestroy{
  @Input() set hasRoles(roles: ERole[]) {
    this.updateView(roles);
  }
  private isHidden = false;

  private _directiveDestroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authorizationService: AuthorizationService
  ) {}

  ngOnDestroy(): void {
    this._directiveDestroy$.next();
    this._directiveDestroy$.complete();
  }

  private updateView(roles: ERole[]) {
    this.authorizationService.userRoles$
      .pipe(takeUntil(this._directiveDestroy$))
      .subscribe(() => {
        this.authorizationService
          .hasRoles(roles)
          .then((result: boolean) => {
            if (result && !this.isHidden) {
              this.viewContainer.createEmbeddedView(this.templateRef);
              this.isHidden = true;
            } else if (!result && this.isHidden) {
              this.viewContainer.clear();
              this.isHidden = false;
            }
          });
      });
  }

}
