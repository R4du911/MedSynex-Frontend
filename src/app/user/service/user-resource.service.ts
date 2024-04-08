import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserResourceService {
  url: string = 'http://localhost:8080/user';

  constructor(
    private http: HttpClient
  ) { }

  getAllUsersWhichAreRegisteredAsPatients() : Observable<User[]> {
    return this.http.get<User[]>(this.url + '/retrieve-patients');
  }

  getAllUsersWhichAreRegisteredAsFamilyDoctors() : Observable<User[]> {
    return this.http.get<User[]>(this.url + '/retrieve-family-doctors');
  }
}
