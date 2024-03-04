import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../core/authentication/service/authentication.service";
import {AuthorizationService} from "../core/authorization/service/authorization.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isLoggedIn() && state.url.includes('register-family-doctor')) {
      return this.authenticationService.firstLogin ? true : this.router.createUrlTree(['home']);
    }

    if (this.authenticationService.isLoggedIn() && state.url.includes('register-doctor')) {
      return this.authenticationService.firstLogin ? true : this.router.createUrlTree(['home']);
    }

    if (this.authenticationService.isLoggedIn() && state.url.includes('register-laboratory')) {
      return this.authenticationService.firstLogin ? true : this.router.createUrlTree(['home']);
    }

    if (this.authenticationService.isLoggedIn() && (state.url.includes('login') || state.url.includes('register'))) {
      return this.router.createUrlTree(['home']);
    }

    if (!this.authenticationService.isLoggedIn() && (state.url.includes('login') || state.url.includes('register'))) {
      return true;
    }

    if (!this.authenticationService.isLoggedIn()) {
      return this.router.createUrlTree(['home']);
    }

    return this.authorizationService.hasRoles(route.data['roles']);
  }

}
