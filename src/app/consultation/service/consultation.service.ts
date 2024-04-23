import { Injectable } from '@angular/core';
import {ConsultationResourceService} from "./consultation-resource.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Consultation} from "../model/consultation";
import {CreateConsultationRequestDTO} from "../model/create-consultation-request";
import {HttpResponse} from "@angular/common/http";
import {UpdateConsultationRequestDTO} from "../model/update-consultation-request";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  consultationsByPatientList$: BehaviorSubject<Consultation[]> = new BehaviorSubject<Consultation[]>([]);

  constructor(
    private consultationResourceService: ConsultationResourceService
  ) { }

  getAllConsultationsByPatient() : Observable<Consultation[]> {
    return this.consultationsByPatientList$.asObservable();
  }

  loadAllConsultationsByPatient(cnp: string) : Observable<Consultation[]> {
    return this.consultationResourceService.loadAllConsultationsByPatient(Number(cnp))
      .pipe(tap((consultations: Consultation[]) => this.consultationsByPatientList$.next(consultations)));
  }

  createConsultation(cnp: string, createConsultationRequestDTO: CreateConsultationRequestDTO) : Observable<HttpResponse<string>> {
    return this.consultationResourceService.createConsultation(Number(cnp), createConsultationRequestDTO);
  }

  updateConsultation(cnp: string, updateConsultationRequestDTO: UpdateConsultationRequestDTO) : Observable<HttpResponse<string>> {
    return this.consultationResourceService.updateConsultation(Number(cnp), updateConsultationRequestDTO);
  }

}
