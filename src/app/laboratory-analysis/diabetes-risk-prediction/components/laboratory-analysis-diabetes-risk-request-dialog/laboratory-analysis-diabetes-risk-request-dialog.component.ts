import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HandleErrorService} from "../../../../utils/error-handling/service/handle-error.service";
import {DiabetesRiskService} from "../../service/diabetes-risk.service";
import {DiabetesRiskPredictionSavedData} from "../../model/diabetes-risk-prediction-saved-data";
import {DiabetesRiskPredictionRequestDTO} from "../../model/diabetes-risk-prediction-request";
import {take} from "rxjs";
import {CustomErrorResponse} from "../../../../utils/error-handling/model/custom-error-response";
import {LaboratoryAnalysisService} from "../../../service/laboratory-analysis.service";

@Component({
  selector: 'app-laboratory-analysis-diabetes-risk-request-dialog',
  templateUrl: './laboratory-analysis-diabetes-risk-request-dialog.component.html',
  styleUrls: ['./laboratory-analysis-diabetes-risk-request-dialog.component.css']
})
export class LaboratoryAnalysisDiabetesRiskRequestDialogComponent implements OnInit{
  diabetesRiskPredictionRequestForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LaboratoryAnalysisDiabetesRiskRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private handleErrorService: HandleErrorService,
    private diabetesRiskService: DiabetesRiskService,
    private laboratoryAnalysisResultService: LaboratoryAnalysisService
  ) {
    this.diabetesRiskPredictionRequestForm = this.setupForm();
  }

  ngOnInit() {
    this.loadDataAndPatchForm();
  }

  loadDataAndPatchForm() {
    this.diabetesRiskService.loadDiabetesRiskPredictionSavedDataByPatient(this.data.patientCNP)
      .subscribe((diabetesRiskPredictionSavedData: DiabetesRiskPredictionSavedData | null) => {
        if (diabetesRiskPredictionSavedData !== null) {
          this.diabetesRiskPredictionRequestForm.patchValue(diabetesRiskPredictionSavedData);
          this.diabetesRiskPredictionRequestForm.markAsTouched();
          this.diabetesRiskPredictionRequestForm.updateValueAndValidity();
        }
      });
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onSave() {
    const formValue = this.diabetesRiskPredictionRequestForm.getRawValue();
    const diabetesRiskPredictionRequest: DiabetesRiskPredictionRequestDTO = new DiabetesRiskPredictionRequestDTO(
      this.data.laboratoryAnalysisResult.id, formValue.pregnancies, formValue.glucose, formValue.bloodPressure,
      formValue.skinThickness, formValue.insulin, formValue.height, formValue.weight, formValue.firstDegreeDiabetesCount,
      formValue.secondDegreeDiabetesCount, formValue.age);

    this.diabetesRiskService.requestDiabetesRiskPrediction(this.data.patientCNP, diabetesRiskPredictionRequest)
      .pipe(take(1))
      .subscribe(() => {
          this.dialogRef.close();
          this.handleErrorService.handleSuccess("Successfully requested Diabetes Risk Prediction for the Laboratory " +
            "Analysis Result with id " + this.data.laboratoryAnalysisResult.id + " of the patient " +
            "with CNP " + this.data.patientCNP);
          this.laboratoryAnalysisResultService.loadAllLaboratoryAnalysisResultsByPatient(String(this.data.patientCNP)).pipe(take(1)).subscribe();
      },
        (error: CustomErrorResponse) => {
          this.handleErrorService.handleError(error);
      });
  }

  setupForm() {
    return this.fb.group({
      pregnancies: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      glucose: [{value: this.data.laboratoryAnalysisResult.glucose, disabled: true}],
      bloodPressure: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      skinThickness: ['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)?$/),
        Validators.min(0.3),
        Validators.max(2.6)]

      ],
      insulin: [{value: this.data.laboratoryAnalysisResult.insulin, disabled: true}],
      height: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      weight: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      firstDegreeDiabetesCount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      secondDegreeDiabetesCount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  getErrorMessagePregnancies() {
    if(this.diabetesRiskPredictionRequestForm.get('pregnancies')!.hasError('required')) {
      return 'Pregnancies number is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('pregnancies')!.hasError('pattern')) {
      return 'Must be a positive integer number';
    }

    return '';
  }

  getErrorMessageBloodPressure() {
    if(this.diabetesRiskPredictionRequestForm.get('bloodPressure')!.hasError('required')) {
      return 'Blood Pressure is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('bloodPressure')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageSkinThickness() {
    if(this.diabetesRiskPredictionRequestForm.get('skinThickness')!.hasError('required')) {
      return 'Skin Thickness is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('skinThickness')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    if(this.diabetesRiskPredictionRequestForm.get('skinThickness')!.hasError('min') ||
      this.diabetesRiskPredictionRequestForm.get('skinThickness')!.hasError('max')) {
      return 'Must be between 0.3 and 2.6 mm';
    }

    return '';
  }

  getErrorMessageHeight() {
    if(this.diabetesRiskPredictionRequestForm.get('height')!.hasError('required')) {
      return 'Height is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('height')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageWeight() {
    if(this.diabetesRiskPredictionRequestForm.get('weight')!.hasError('required')) {
      return 'Weight is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('weight')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageFirstDegreeDiabetesCount() {
    if(this.diabetesRiskPredictionRequestForm.get('firstDegreeDiabetesCount')!.hasError('required')) {
      return 'First Degree Diabetes Count is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('firstDegreeDiabetesCount')!.hasError('pattern')) {
      return 'Must be a positive integer number';
    }

    return '';
  }

  getErrorMessageSecondDegreeDiabetesCount() {
    if(this.diabetesRiskPredictionRequestForm.get('secondDegreeDiabetesCount')!.hasError('required')) {
      return 'Second Degree Diabetes Count is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('secondDegreeDiabetesCount')!.hasError('pattern')) {
      return 'Must be a positive integer number';
    }

    return '';
  }

  getErrorMessageAge() {
    if(this.diabetesRiskPredictionRequestForm.get('age')!.hasError('required')) {
      return 'Age is required';
    }

    if (this.diabetesRiskPredictionRequestForm.get('age')!.hasError('pattern')) {
      return 'Must be a positive integer number';
    }

    return '';
  }
}
