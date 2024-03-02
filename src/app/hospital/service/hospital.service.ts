import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Hospital} from "../model/hospital";
import {HospitalResourceService} from "./hospital-resource.service";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospitalList$: BehaviorSubject<Hospital[]> = new BehaviorSubject<Hospital[]>([]);

  constructor(
    private hospitalResourceService: HospitalResourceService
  ) { }

  getHospitals() : Observable<Hospital[]> {
    return this.hospitalList$.asObservable();
  }

  loadHospitals() : Observable<Hospital[]> {
    return this.hospitalResourceService.loadHospitals()
      .pipe(tap((hospitals: Hospital[]) => this.hospitalList$.next(hospitals)));
  }
}
