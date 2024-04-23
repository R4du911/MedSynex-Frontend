import {Component} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Observable, Subject} from "rxjs";
import {UserService} from "../../../user/service/user.service";
import {User} from "../../../user/model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-record-searcher-doctor',
  templateUrl: './record-searcher-doctor.component.html',
  styleUrls: ['./record-searcher-doctor.component.css']
})
export class RecordSearcherDoctorComponent {
  searchPatientRecordForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<RecordSearcherDoctorComponent>
  ) {
    this.searchPatientRecordForm = this.setupForm();
  }

  onDialogClose() : void {
    this.dialogRef.close();
  }

  onSave() {
    const requestedCNP = this.searchPatientRecordForm.get('cnp')?.value;
    this.dialogRef.close();
    this.router.navigate(['records', requestedCNP]);
  }

  setupForm() {
    return this.fb.group({
      cnp: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]]
    })
  }

  getErrorMessageCNP() {
    if(this.searchPatientRecordForm.get('cnp')!.hasError('required')) {
      return 'CNP is required';
    }

    if (this.searchPatientRecordForm.get('cnp')!.hasError('pattern')) {
      return 'Can only contain digits and must be 13 characters';
    }

    return '';
  }

}
