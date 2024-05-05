import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {DiabetesRiskPredictionRequestDTO} from "../model/diabetes-risk-prediction-request";
import {Observable} from "rxjs";
import {DiabetesRiskPredictionSavedData} from "../model/diabetes-risk-prediction-saved-data";

@Injectable({
  providedIn: 'root'
})
export class DiabetesRiskResourceService {
  url: string = 'http://localhost:8080/diabetes-prediction';

  constructor(
    private http: HttpClient
  ) { }

  loadDiabetesRiskPredictionSavedDataByPatient(cnp: number) : Observable<DiabetesRiskPredictionSavedData | null> {
    return this.http.get<DiabetesRiskPredictionSavedData | null>(this.url + '/retrieve-saved-data/' + cnp);
  }

  requestDiabetesRiskPrediction(cnp: number, diabetesRiskPredictionRequestDTO: DiabetesRiskPredictionRequestDTO): Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.url + '/' + cnp, diabetesRiskPredictionRequestDTO);
  }
}
