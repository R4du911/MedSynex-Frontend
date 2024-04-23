import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {firstValueFrom, take} from "rxjs";
import {AuthenticationService} from "../core/authentication/service/authentication.service";
import {AuthorizationService} from "../core/authorization/service/authorization.service";
import {ERole} from "../core/authorization/model/ERole";
import {UserService} from "../user/service/user.service";
import {User} from "../user/model/user";
import {FamilyDoctorService} from "../family-doctor/service/family-doctor.service";
import {Patient} from "../patient/model/patient";
import {HandleErrorService} from "./error-handling/service/handle-error.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private userService: UserService,
    private familyDoctorService: FamilyDoctorService,
    private router: Router,
    private handleErrorService: HandleErrorService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (state.url.includes('register-patient')  || state.url.includes('register-family-doctor')
      || state.url.includes('register-doctor') || state.url.includes('register-laboratory')) {
      return this.authenticationService.isLoggedIn() && this.authenticationService.firstLogin
        ? this.authorizationService.hasRoles(route.data['roles']) : this.router.createUrlTree(['home']);
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

    if (state.url.includes('records')){
      const requestedCNP = route.params['cnp'];
      const userRole : ERole[] = this.authorizationService.getUserRoles();
      const username: string | null = this.authenticationService.getLoggedInUsername();

      if(userRole.includes(ERole.Patient) && username) {
        const user: User = await firstValueFrom(this.userService.loadCurrentUserDetails(username));

        if (user.patient.cnp == requestedCNP) {
          return true;
        }

        this.handleErrorService.handleError({ errorCode: "FORBIDDEN", message: "Access is not allowed" });
        return this.router.createUrlTree(['home']);
      }

      if(userRole.includes(ERole.FamilyDoctor) && username) {
        const patients: Patient[] = await firstValueFrom(
          this.familyDoctorService.loadAllPatientsRegisteredAtAGivenFamilyDoctor(username).pipe(take(1))
        );

        const isAuthorized: boolean = patients.some((patient: Patient) => patient.cnp == requestedCNP);

        if (isAuthorized) {
          return true;
        }

        this.handleErrorService.handleError({ errorCode: "FORBIDDEN", message: "Access is not allowed" });
        return this.router.createUrlTree(['home']);
      }

      if(userRole.includes(ERole.Doctor) && username) {
        const users: User[] = await firstValueFrom(
          this.userService.loadUsersWhichAreRegisteredAsPatients().pipe(take(1))
        );

        const isAuthorized: boolean = users.some((user: User) => user.patient.cnp == requestedCNP);

        if (isAuthorized) {
          return true;
        }

        this.handleErrorService.handleError({ errorCode: "INVALID_DATA", message: "Data is invalid" });
        return this.router.createUrlTree(['home']);
      }
    }

    return this.authorizationService.hasRoles(route.data['roles']);
  }

}
