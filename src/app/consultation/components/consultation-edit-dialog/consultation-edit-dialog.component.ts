import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Consultation} from "../../model/consultation";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ConsultationService} from "../../service/consultation.service";

@Component({
  selector: 'app-consultation-edit-dialog',
  templateUrl: './consultation-edit-dialog.component.html',
  styleUrls: ['./consultation-edit-dialog.component.css']
})
export class ConsultationEditDialogComponent {
  consultationForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConsultationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consultation | null,
    private consultationService: ConsultationService
  ) {
    this.consultationForm = this.setupForm();

    if (this.data) {
      this.consultationForm.patchValue(this.data);
    }
  }

  setupForm() {
    return this.fb.group({
      diagnosis: ['', Validators.required],
      remarks: ['', [Validators.required, Validators.maxLength(400)]],
      medications: ['', [Validators.required, Validators.maxLength(400)]]
    });
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close();
  }

  getErrorMessageDiagnosis() {
    if(this.consultationForm.get('diagnosis')!.hasError('required')) {
      return 'Diagnosis is required';
    }

    return '';
  }

  getErrorMessageRemarks() {
    if(this.consultationForm.get('remarks')!.hasError('required')) {
      return 'Remarks are required';
    }

    if (this.consultationForm.get('remarks')!.hasError('maxlength')) {
      return 'Remarks cannot exceed 400 characters';
    }

    return '';
  }

  getErrorMessageMedications() {
    if(this.consultationForm.get('medications')!.hasError('required')) {
      return 'Medications is required';
    }

    if (this.consultationForm.get('medications')!.hasError('maxlength')) {
      return 'Medications cannot exceed 400 characters';
    }

    return '';
  }
}
