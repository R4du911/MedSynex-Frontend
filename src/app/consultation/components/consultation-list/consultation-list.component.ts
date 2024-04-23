import {AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Consultation} from "../../model/consultation";
import {MatSort} from "@angular/material/sort";
import {ConsultationService} from "../../service/consultation.service";
import {HandleErrorService} from "../../../utils/error-handling/service/handle-error.service";

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit, OnDestroy, AfterContentInit{
  @Input() patientCNP: string = '';

  dataSource = new MatTableDataSource<Consultation>();

  consultationsByPatientList$: Observable<Consultation[]> = new Observable<Consultation[]>();
  private _componentDestroy$ = new Subject<void>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private consultationService: ConsultationService,
    private handleErrorService: HandleErrorService
  ) {
  }

  ngAfterContentInit(): void {
    this.consultationsByPatientList$
      .pipe(takeUntil(this._componentDestroy$))
      .subscribe((consultations: Consultation[]) => {
        this.dataSource.data = consultations;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  ngOnInit(): void {
    this.consultationService.loadAllConsultationsByPatient(this.patientCNP)
      .pipe(take(1)).subscribe();

    this.consultationsByPatientList$ = this.consultationService.getAllConsultationsByPatient();
  }

  onEdit(consultation: Consultation) {

  }

  onMoreInfo(consultation: Consultation) {

  }
}
