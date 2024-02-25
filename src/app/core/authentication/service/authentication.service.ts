import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: Observable<string | null>;
  private currentUserSubject$ = new BehaviorSubject<string | null>(
    this.getLoggedInUsername()
  );

  private _firstLogin = false;

  constructor(
    private router: Router
  ) {
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  get firstLogin() {
    return this._firstLogin;
  }

  set firstLogin(firstLogin: boolean) {
    this._firstLogin = firstLogin;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.setCurrentUser(null);
    this.router.navigate(['/login']);
  }

  getLoggedInUsername(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<{ sub: string }>(token);
      if (decoded && 'sub' in decoded) {
        return decoded.sub;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject$.getValue();
  }

  setCurrentUser(username: string|null): void {
    this.currentUserSubject$.next(username);
  }

}
