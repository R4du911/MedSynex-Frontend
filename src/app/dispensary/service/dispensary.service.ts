import { Injectable } from '@angular/core';
import {DispensaryResourceService} from "./dispensary-resource.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Dispensary} from "../model/dispensary";

@Injectable({
  providedIn: 'root'
})
export class DispensaryService {
  dispensaryList$: BehaviorSubject<Dispensary[]> = new BehaviorSubject<Dispensary[]>([]);

  constructor(
    private dispensaryResourceService: DispensaryResourceService
  ) { }

  getDispensaries() : Observable<Dispensary[]> {
    return this.dispensaryList$.asObservable();
  }

  loadDispensaries() : Observable<Dispensary[]> {
    return this.dispensaryResourceService.loadDispensaries()
      .pipe(tap((dispensaries : Dispensary[]) => this.dispensaryList$.next(dispensaries)));
  }

}
