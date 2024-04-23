import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Consultation} from "../model/consultation";
import {CreateConsultationRequestDTO} from "../model/create-consultation-request";
import {UpdateConsultationRequestDTO} from "../model/update-consultation-request";

@Injectable({
  providedIn: 'root'
})
export class ConsultationResourceService {
  url: string = 'http://localhost:8080/consultation';

  constructor(
    private http: HttpClient
  ) { }

  loadAllConsultationsByPatient(cnp: number) : Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.url + '/' + cnp);
  }

  createConsultation(cnp: number, createConsultationRequestDTO: CreateConsultationRequestDTO) : Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/' + cnp, createConsultationRequestDTO);
  }

  updateConsultation(cnp: number, updateConsultationRequestDTO: UpdateConsultationRequestDTO) : Observable<HttpResponse<string>> {
    return this.http.put<HttpResponse<string>>(this.url + '/' + cnp, updateConsultationRequestDTO);
  }
}
