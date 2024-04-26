import { Component } from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {LaboratoryAnalysisService} from "../../service/laboratory-analysis.service";

@Component({
  selector: 'app-laboratory-analysis-create-dialog',
  templateUrl: './laboratory-analysis-create-dialog.component.html',
  styleUrls: ['./laboratory-analysis-create-dialog.component.css']
})
export class LaboratoryAnalysisCreateDialogComponent {
  laboratoryAnalysisResultForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LaboratoryAnalysisCreateDialogComponent>,
    private handleErrorService: HandleErrorService,
    private laboratoryAnalysisResultService: LaboratoryAnalysisService
  ) {
    this.laboratoryAnalysisResultForm = this.setupForm();
  }

  setupForm() {
    return this.fb.group({
      glucose: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      insulin: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      cholesterol: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      triglyceride: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      haemoglobin: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      leukocyteCount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      plateletCount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      totalCalcium: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      totalMagnesium: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      serumIron: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      serumSodium: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      serumPotassium: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      cnp: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]]
    });
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close();
  }

  getErrorMessageGlucose() {
    if(this.laboratoryAnalysisResultForm.get('glucose')!.hasError('required')) {
      return 'Glucose is required';
    }

    if (this.laboratoryAnalysisResultForm.get('glucose')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageInsulin() {
    if(this.laboratoryAnalysisResultForm.get('insulin')!.hasError('required')) {
      return 'Insulin is required';
    }

    if (this.laboratoryAnalysisResultForm.get('insulin')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageCholesterol() {
    if(this.laboratoryAnalysisResultForm.get('cholesterol')!.hasError('required')) {
      return 'Cholesterol is required';
    }

    if (this.laboratoryAnalysisResultForm.get('cholesterol')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageTriglyceride() {
    if(this.laboratoryAnalysisResultForm.get('triglyceride')!.hasError('required')) {
      return 'Triglyceride is required';
    }

    if (this.laboratoryAnalysisResultForm.get('triglyceride')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageHaemoglobin() {
    if(this.laboratoryAnalysisResultForm.get('haemoglobin')!.hasError('required')) {
      return 'Haemoglobin is required';
    }

    if (this.laboratoryAnalysisResultForm.get('haemoglobin')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageLeukocyteCount() {
    if(this.laboratoryAnalysisResultForm.get('leukocyteCount')!.hasError('required')) {
      return 'Leukocyte count is required';
    }

    if (this.laboratoryAnalysisResultForm.get('leukocyteCount')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessagePlateletCount() {
    if(this.laboratoryAnalysisResultForm.get('plateletCount')!.hasError('required')) {
      return 'Platelet count is required';
    }

    if (this.laboratoryAnalysisResultForm.get('plateletCount')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageTotalCalcium() {
    if(this.laboratoryAnalysisResultForm.get('totalCalcium')!.hasError('required')) {
      return 'Total Calcium is required';
    }

    if (this.laboratoryAnalysisResultForm.get('totalCalcium')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageTotalMagnesium() {
    if(this.laboratoryAnalysisResultForm.get('totalMagnesium')!.hasError('required')) {
      return 'Total Magnesium is required';
    }

    if (this.laboratoryAnalysisResultForm.get('totalMagnesium')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageSerumIron() {
    if(this.laboratoryAnalysisResultForm.get('serumIron')!.hasError('required')) {
      return 'Serum Iron is required';
    }

    if (this.laboratoryAnalysisResultForm.get('serumIron')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageSerumSodium() {
    if(this.laboratoryAnalysisResultForm.get('serumSodium')!.hasError('required')) {
      return 'Serum Sodium is required';
    }

    if (this.laboratoryAnalysisResultForm.get('serumSodium')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageSerumPotassium() {
    if(this.laboratoryAnalysisResultForm.get('serumPotassium')!.hasError('required')) {
      return 'Serum Potassium is required';
    }

    if (this.laboratoryAnalysisResultForm.get('serumPotassium')!.hasError('pattern')) {
      return 'Must be a positive decimal number';
    }

    return '';
  }

  getErrorMessageCNP() {
    if(this.laboratoryAnalysisResultForm.get('cnp')!.hasError('required')) {
      return 'CNP is required';
    }

    if (this.laboratoryAnalysisResultForm.get('cnp')!.hasError('pattern')) {
      return 'Can only contain digits and must be 13 characters';
    }

    return '';
  }

}
