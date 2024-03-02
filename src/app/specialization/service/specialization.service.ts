import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Specialization} from "../model/specialization";
import {SpecializationResourceService} from "./specialization-resource.service";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  specializationList$: BehaviorSubject<Specialization[]> = new BehaviorSubject<Specialization[]>([]);

  constructor(
    private specializationResourceService: SpecializationResourceService
  ) { }

  getSpecializations() : Observable<Specialization[]> {
    return this.specializationList$.asObservable();
  }

  loadSpecializations() : Observable<Specialization[]> {
    return this.specializationResourceService.loadSpecializations()
      .pipe(tap((specializations: Specialization[]) => this.specializationList$.next(specializations)));
  }

}
