import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hospital} from "../model/hospital";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HospitalResourceService {
  url: string = 'http://localhost:8080/hospital';

  constructor(
    private http: HttpClient
  ) { }

  loadHospitals() : Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.url);
  }
}
