import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import {ERole} from "../model/ERole";
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
      if (decoded) {
        const userRoles: ERole[] = decoded.roles.map(role => {
          const key = Object.keys(ERole).find(key => ERole[key as keyof typeof ERole] === role);
          return key ? ERole[key as keyof typeof ERole] : undefined;
        }).filter((role): role is ERole => role !== undefined);

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
