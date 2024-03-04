import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dispensary} from "../model/dispensary";

@Injectable({
  providedIn: 'root'
})
export class DispensaryResourceService {
  url: string = 'http://localhost:8080/dispensary';

  constructor(
    private http: HttpClient
  ) { }

  loadDispensaries() : Observable<Dispensary[]> {
    return this.http.get<Dispensary[]>(this.url);
  }

}
