import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LaboratoryAnalysisResult} from "../../model/laboratory-analysis-result";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {
  UpdateRemarksLaboratoryAnalysisResultRequestDTO
} from "../../model/update-remarks-laboratory-analysis-result-request";
import {LaboratoryAnalysisService} from "../../service/laboratory-analysis.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {take} from "rxjs";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";

@Component({
  selector: 'app-laboratory-analysis-edit-dialog',
  templateUrl: './laboratory-analysis-edit-dialog.component.html',
  styleUrls: ['./laboratory-analysis-edit-dialog.component.css']
})
export class LaboratoryAnalysisEditDialogComponent {
  laboratoryAnalysisResultForm: UntypedFormGroup;
  initialFormState: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LaboratoryAnalysisEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private laboratoryAnalysisResultService: LaboratoryAnalysisService,
    private handleErrorService: HandleErrorService
  ) {
    this.laboratoryAnalysisResultForm = this.setupForm();

    if (this.data.laboratoryAnalysisResult.remarks) {
      this.laboratoryAnalysisResultForm.patchValue(this.data.laboratoryAnalysisResult);
      this.initialFormState = this.laboratoryAnalysisResultForm.value;
    }

  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onSave() {
    const formValue = this.laboratoryAnalysisResultForm.getRawValue();
    const updateRemarksLaboratoryAnalysisResultRequestDTO: UpdateRemarksLaboratoryAnalysisResultRequestDTO = new UpdateRemarksLaboratoryAnalysisResultRequestDTO(
      this.data.laboratoryAnalysisResult.id, formValue.remarks);

    this.laboratoryAnalysisResultService.updateRemarksForLaboratoryAnalysisResult(this.data.patientCNP, updateRemarksLaboratoryAnalysisResultRequestDTO)
      .pipe(take(1))
      .subscribe(() => {
          this.dialogRef.close();
          this.laboratoryAnalysisResultService.loadAllLaboratoryAnalysisResultsByPatient(String(this.data.patientCNP)).pipe(take(1)).subscribe();
      },
        (error: CustomErrorResponse) => {
          this.handleErrorService.handleError(error);
        }
      );

    this.handleErrorService.handleSuccess("Laboratory Analysis Result updated with success");
  }

  setupForm() {
    return this.fb.group({
      remarks: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  hasFormChanged() {
    return JSON.stringify(this.laboratoryAnalysisResultForm.value) !== JSON.stringify(this.initialFormState);
  }

  getErrorMessageRemarks() {
    if(this.laboratoryAnalysisResultForm.get('remarks')!.hasError('required')) {
      return 'Remarks are required';
    }

    if (this.laboratoryAnalysisResultForm.get('remarks')!.hasError('maxlength')) {
      return 'Remarks cannot exceed 250 characters';
    }

    return '';
  }
}
