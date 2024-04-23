import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Consultation} from "../../model/consultation";

@Component({
  selector: 'app-consultation-more-info',
  templateUrl: './consultation-more-info.component.html',
  styleUrls: ['./consultation-more-info.component.css']
})
export class ConsultationMoreInfoComponent {
  constructor(
    private dialogRef: MatDialogRef<ConsultationMoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public consultation: Consultation
  ) {
  }

}
