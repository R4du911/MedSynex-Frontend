import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specialization} from "../model/specialization";

@Injectable({
  providedIn: 'root'
})
export class SpecializationResourceService {
  url: string = 'http://localhost:8080/specialization';

  constructor(
    private http: HttpClient
  ) { }

  loadSpecializations() : Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.url);
  }
}
