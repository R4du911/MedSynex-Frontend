import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import {ERole} from "../../../user/ERole";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userRoles$: Observable<ERole[]>;

  private _userRolesSubject = new BehaviorSubject<ERole[]>([]);

  constructor() {
    this.userRoles$ = this._userRolesSubject.asObservable();
  }

  getUserRoles(): ERole[] {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<{ roles: string[] }>(token);
      if (decoded.roles) {
        const userRoles : ERole[] = decoded.roles.map(role => ERole[role as keyof typeof ERole]).filter(role => role !== undefined);
        this._userRolesSubject.next(userRoles);
        return userRoles;
      }
    }

    return [];
  }

  hasRoles(targetRoles: ERole[]) : Promise<boolean> {
    const userRoles : ERole[] = this._userRolesSubject
      .getValue();
    return Promise.resolve(targetRoles.some((role) =>
      userRoles.includes(role)
    ));
  }

}
