import {AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LaboratoryAnalysisResult} from "../../model/laboratory-analysis-result";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LaboratoryAnalysisService} from "../../service/laboratory-analysis.service";
import {MatDialog} from "@angular/material/dialog";
import {ERole} from "../../../core/authorization/model/ERole";

@Component({
  selector: 'app-laboratory-analysis-list',
  templateUrl: './laboratory-analysis-list.component.html',
  styleUrls: ['./laboratory-analysis-list.component.css']
})
export class LaboratoryAnalysisListComponent implements OnInit, OnDestroy, AfterContentInit{
  @Input() patientCNP: string = '';

  dataSource = new MatTableDataSource<LaboratoryAnalysisResult>();

  laboratoryAnalysisResultsByPatientList$: Observable<LaboratoryAnalysisResult[]> = new Observable<LaboratoryAnalysisResult[]>();
  private _componentDestroy$ = new Subject<void>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private laboratoryAnalysisResultService: LaboratoryAnalysisService,
    private dialog: MatDialog
  ) {}

  ngAfterContentInit(): void {
    this.laboratoryAnalysisResultsByPatientList$
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((laboratoryAnalysisResults: LaboratoryAnalysisResult[]) => {
        this.dataSource.data = laboratoryAnalysisResults;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  ngOnInit(): void {
    this.laboratoryAnalysisResultService.loadAllLaboratoryAnalysisResultsByPatient(this.patientCNP)
      .pipe(take(1)).subscribe();

    this.laboratoryAnalysisResultsByPatientList$ = this.laboratoryAnalysisResultService.getAllLaboratoryAnalysisResultsByPatient();
  }

  onEditRemarks(laboratoryAnalysisResult: LaboratoryAnalysisResult) {

  }

  onMoreInfo(laboratoryAnalysisResult: LaboratoryAnalysisResult) {

  }

  requestDiabetesPrediction(laboratoryAnalysisResult: LaboratoryAnalysisResult) {

  }

  protected readonly ERole = ERole;
}
