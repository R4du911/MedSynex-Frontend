import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LaboratoryAnalysisResult} from "../model/laboratory-analysis-result";
import {LaboratoryAnalysisResourceService} from "./laboratory-analysis-resource.service";
import {HttpResponse} from "@angular/common/http";
import {CreateLaboratoryAnalysisResultRequestDTO} from "../model/create-laboratory-analysis-result-request";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryAnalysisService {
  laboratoryAnalysisResultsByPatientList$ : BehaviorSubject<LaboratoryAnalysisResult[]> = new BehaviorSubject<LaboratoryAnalysisResult[]>([]);

  constructor(
    private laboratoryAnalysisResultResourceService: LaboratoryAnalysisResourceService
  ) { }

  getAllLaboratoryAnalysisResultsByPatient() : Observable<LaboratoryAnalysisResult[]> {
    return this.laboratoryAnalysisResultsByPatientList$.asObservable();
  }

  loadAllLaboratoryAnalysisResultsByPatient(cnp: string) : Observable<LaboratoryAnalysisResult[]> {
    return this.laboratoryAnalysisResultResourceService.loadAllLaboratoryAnalysisResultsByPatient(Number(cnp))
      .pipe(tap((laboratoryAnalysisResults: LaboratoryAnalysisResult[]) => this.laboratoryAnalysisResultsByPatientList$.next(laboratoryAnalysisResults)));
  }

  createLaboratoryAnalysisResult(cnp: number, createLaboratoryAnalysisResultRequestDTO: CreateLaboratoryAnalysisResultRequestDTO) : Observable<HttpResponse<string>> {
    return this.laboratoryAnalysisResultResourceService.createLaboratoryAnalysisResult(cnp, createLaboratoryAnalysisResultRequestDTO);
  }
}
