import { Injectable } from '@angular/core';
import {DiabetesRiskResourceService} from "./diabetes-risk-resource.service";
import {DiabetesRiskPredictionRequestDTO} from "../model/diabetes-risk-prediction-request";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {DiabetesRiskPredictionSavedData} from "../model/diabetes-risk-prediction-saved-data";

@Injectable({
  providedIn: 'root'
})
export class DiabetesRiskService {

  constructor(
    private diabetesRiskResourceService: DiabetesRiskResourceService
  ) { }

  loadDiabetesRiskPredictionSavedDataByPatient(cnp: number): Observable<DiabetesRiskPredictionSavedData | null> {
    return this.diabetesRiskResourceService.loadDiabetesRiskPredictionSavedDataByPatient(cnp);
  }

  requestDiabetesRiskPrediction(cnp: number, diabetesRiskPredictionRequestDTO: DiabetesRiskPredictionRequestDTO): Observable<HttpResponse<string>> {
    return this.diabetesRiskResourceService.requestDiabetesRiskPrediction(cnp, diabetesRiskPredictionRequestDTO);
  }
}
