import { Injectable } from '@angular/core';
import {LaboratoryResourceService} from "./laboratory-resource.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Laboratory} from "../model/laboratory";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  laboratoryList$: BehaviorSubject<Laboratory[]> = new BehaviorSubject<Laboratory[]>([]);

  constructor(
    private laboratoryResourceService: LaboratoryResourceService
  ) { }

  getLaboratories() : Observable<Laboratory[]> {
    return this.laboratoryList$.asObservable();
  }

  loadLaboratories() : Observable<Laboratory[]> {
    return this.laboratoryResourceService.loadLaboratories()
      .pipe(tap((laboratories : Laboratory[]) => this.laboratoryList$.next(laboratories)));
  }
}
