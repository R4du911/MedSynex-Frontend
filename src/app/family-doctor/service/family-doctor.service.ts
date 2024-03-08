import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {FamilyDoctor} from "../model/family-doctor";
import {FamilyDoctorResourceService} from "./family-doctor-resource.service";
import {Dispensary} from "../../dispensary/model/dispensary";

@Injectable({
  providedIn: 'root'
})
export class FamilyDoctorService {
  familyDoctorsFromAGivenDispensaryList$: BehaviorSubject<FamilyDoctor[]> = new BehaviorSubject<FamilyDoctor[]>([]);

  constructor(
    private familyDoctorResourceService: FamilyDoctorResourceService
  ) { }

  getFamilyDoctorFromAGivenDispensary() : Observable<FamilyDoctor[]> {
    return this.familyDoctorsFromAGivenDispensaryList$.asObservable();
  }

  loadFamilyDoctorFromAGivenDispensary(dispensary: Dispensary) : Observable<FamilyDoctor[]> {
    return this.familyDoctorResourceService.loadFamilyDoctorsFromAGivenDispensary(dispensary)
      .pipe(tap((familyDoctors : FamilyDoctor[]) => this.familyDoctorsFromAGivenDispensaryList$.next(familyDoctors)));
  }
}
