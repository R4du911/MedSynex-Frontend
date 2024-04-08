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

  getUsersWhichAreRegisteredAsWantedRole() : Observable<User[]> {
    return this.usersRegisteredAsFamilyDoctorsList$.asObservable();
  }

  loadUsersWhichAreRegisteredAsPatients() : Observable<User[]> {
    return this.userResourceService.getAllUsersWhichAreRegisteredAsPatients()
      .pipe(tap((users: User[]) => this.usersRegisteredAsFamilyDoctorsList$.next(users)));
  }

  loadUsersWhichAreRegisteredAsFamilyDoctors() : Observable<User[]> {
    return this.userResourceService.getAllUsersWhichAreRegisteredAsFamilyDoctors()
      .pipe(tap((users: User[]) => this.usersRegisteredAsFamilyDoctorsList$.next(users)));
  }
}
