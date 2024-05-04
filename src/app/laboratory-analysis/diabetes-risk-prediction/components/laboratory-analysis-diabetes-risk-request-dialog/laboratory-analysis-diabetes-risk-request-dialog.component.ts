import {Component, Inject} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HandleErrorService} from "../../../../utils/error-handling/service/handle-error.service";

@Component({
  selector: 'app-laboratory-analysis-diabetes-risk-request-dialog',
  templateUrl: './laboratory-analysis-diabetes-risk-request-dialog.component.html',
  styleUrls: ['./laboratory-analysis-diabetes-risk-request-dialog.component.css']
})
export class LaboratoryAnalysisDiabetesRiskRequestDialogComponent {
  diabetesRiskPredictionRequestForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LaboratoryAnalysisDiabetesRiskRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private handleErrorService: HandleErrorService,
  ) {
    this.diabetesRiskPredictionRequestForm = this.setupForm();
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close();
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
      height: ['', [Validators.required], Validators.pattern(/^\d+(\.\d+)?$/)],
      weight: ['', [Validators.required], Validators.pattern(/^\d+(\.\d+)?$/)],
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
