import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Laboratory} from "../model/laboratory";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryResourceService {
  url: string = 'http://localhost:8080/laboratory';

  constructor(
    private http: HttpClient
  ) { }


  loadLaboratories() : Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(this.url)
  }

}
