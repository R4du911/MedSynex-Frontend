import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LaboratoryAnalysisResult} from "../model/laboratory-analysis-result";
import {CreateLaboratoryAnalysisResultRequestDTO} from "../model/create-laboratory-analysis-result-request";
import {
  UpdateRemarksLaboratoryAnalysisResultRequestDTO
} from "../model/update-remarks-laboratory-analysis-result-request";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryAnalysisResourceService {
  url: string = 'http://localhost:8080/laboratory-analysis-result';

  constructor(
    private http: HttpClient
  ) { }

  loadAllLaboratoryAnalysisResultsByPatient(cnp: number): Observable<LaboratoryAnalysisResult[]> {
    return this.http.get<LaboratoryAnalysisResult[]>(this.url + '/' + cnp);
  }

  createLaboratoryAnalysisResult(cnp: number, createLaboratoryAnalysisResultRequestDTO: CreateLaboratoryAnalysisResultRequestDTO): Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/' + cnp, createLaboratoryAnalysisResultRequestDTO);
  }

  updateRemarksForLaboratoryAnalysisResult(cnp: number, updateRemarksLaboratoryAnalysisRequestDTO: UpdateRemarksLaboratoryAnalysisResultRequestDTO): Observable<HttpResponse<string>> {
    return this.http.put<HttpResponse<string>>(this.url + '/' + cnp + '/remarks', updateRemarksLaboratoryAnalysisRequestDTO);
  }
}
