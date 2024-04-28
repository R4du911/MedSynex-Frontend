import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LaboratoryAnalysisResult} from "../../model/laboratory-analysis-result";

@Component({
  selector: 'app-laboratory-analysis-more-info',
  templateUrl: './laboratory-analysis-more-info.component.html',
  styleUrls: ['./laboratory-analysis-more-info.component.css']
})
export class LaboratoryAnalysisMoreInfoComponent {
  constructor(
    private dialogRef: MatDialogRef<LaboratoryAnalysisMoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public laboratoryAnalysisResult: LaboratoryAnalysisResult
  ) {
  }

  onDialogClose() {
    this.dialogRef.close();
  }
}
