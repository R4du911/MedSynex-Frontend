import { Injectable } from '@angular/core';
import {UserResourceService} from "./user-resource.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRegisteredAsFamilyDoctorsList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private userResourceService: UserResourceService
  ) { }

  getUsersWhichAreRegisteredAsFamilyDoctors() : Observable<User[]> {
    return this.usersRegisteredAsFamilyDoctorsList$.asObservable();
  }

  loadUsersWhichAreRegisteredAsFamilyDoctors() : Observable<User[]> {
    return this.userResourceService.getAllUsersWhichAreRegisteredAsFamilyDoctors()
      .pipe(tap((users: User[]) => this.usersRegisteredAsFamilyDoctorsList$.next(users)));
  }
}
