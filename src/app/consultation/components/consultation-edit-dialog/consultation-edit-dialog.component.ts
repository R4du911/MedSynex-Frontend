import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Consultation} from "../../model/consultation";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ConsultationService} from "../../service/consultation.service";
import {UpdateConsultationRequestDTO} from "../../model/update-consultation-request";
import {take} from "rxjs";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";
import {CustomErrorResponse} from "../../../utils/error-handling/model/custom-error-response";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {CreateConsultationRequestDTO} from "../../model/create-consultation-request";

@Component({
  selector: 'app-consultation-edit-dialog',
  templateUrl: './consultation-edit-dialog.component.html',
  styleUrls: ['./consultation-edit-dialog.component.css']
})
export class ConsultationEditDialogComponent {
  consultationForm: UntypedFormGroup;
  initialFormState: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConsultationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consultationService: ConsultationService,
    private handleErrorService: HandleErrorService,
    private authenticationService: AuthenticationService
  ) {
    this.consultationForm = this.setupForm();

    if (this.data.consultation) {
      this.consultationForm.patchValue(this.data.consultation);
      this.initialFormState = this.consultationForm.value;
    }
  }

  setupForm() {
    return this.fb.group({
      diagnosis: ['', Validators.required],
      remarks: ['', [Validators.required, Validators.maxLength(400)]],
      medications: ['', [Validators.required, Validators.maxLength(400)]]
    });
  }

  hasFormChanged() {
    return JSON.stringify(this.consultationForm.value) !== JSON.stringify(this.initialFormState);
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onSave() {
    const formValue = this.consultationForm.getRawValue();
    const doctorUsername: string | null = this.authenticationService.getLoggedInUsername();

    if (this.data.consultation) {
      const updateConsultationRequest: UpdateConsultationRequestDTO = new UpdateConsultationRequestDTO(
        this.data.consultation.id, formValue.diagnosis, formValue.remarks, formValue.medications
      );

      this.consultationService.updateConsultation(this.data.patientCNP, updateConsultationRequest)
        .pipe(take(1))
        .subscribe(() => {
          this.dialogRef.close();
          this.consultationService.loadAllConsultationsByPatient(String(this.data.patientCNP)).pipe(take(1)).subscribe();
          },
          (error: CustomErrorResponse) => {
            this.handleErrorService.handleError(error);
          }
        );

      this.handleErrorService.handleSuccess("Consultation updated with success");
    }
    else {
      if(doctorUsername !== null) {
        const createConsultationRequest: CreateConsultationRequestDTO = new CreateConsultationRequestDTO(
          doctorUsername, formValue.diagnosis, formValue.remarks, formValue.medications
        );

        this.consultationService.createConsultation(this.data.patientCNP, createConsultationRequest)
          .pipe(take(1))
          .subscribe(() => {
            this.dialogRef.close();
            this.consultationService.loadAllConsultationsByPatient(String(this.data.patientCNP)).pipe(take(1)).subscribe();
            },
              (error: CustomErrorResponse) => {
                this.handleErrorService.handleError(error);
            }
          );

        this.handleErrorService.handleSuccess("Consultation created with success");
      }
      else {
        this.handleErrorService.handleError({ errorCode: "INVALID_USER", message: "User is invalid" });
      }
    }
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
