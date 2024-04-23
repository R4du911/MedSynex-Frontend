import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Consultation} from "../../model/consultation";

@Component({
  selector: 'app-consultation-edit-dialog',
  templateUrl: './consultation-edit-dialog.component.html',
  styleUrls: ['./consultation-edit-dialog.component.css']
})
export class ConsultationEditDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConsultationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consultation | null,
  ) {
  }

}
