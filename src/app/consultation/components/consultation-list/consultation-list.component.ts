import {AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Consultation} from "../../model/consultation";
import {MatSort} from "@angular/material/sort";
import {ConsultationService} from "../../service/consultation.service";
import {AuthenticationService} from "../../../core/authentication/service/authentication.service";
import {ERole} from "../../../core/authorization/model/ERole";
import {MatDialog} from "@angular/material/dialog";
import {ConsultationMoreInfoComponent} from "../consultation-more-info/consultation-more-info.component";
import {ConsultationEditDialogComponent} from "../consultation-edit-dialog/consultation-edit-dialog.component";

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit, OnDestroy, AfterContentInit{
  @Input() patientCNP: string = '';
  username: string | null = null;

  dataSource = new MatTableDataSource<Consultation>();

  consultationsByPatientList$: Observable<Consultation[]> = new Observable<Consultation[]>();
  private _componentDestroy$ = new Subject<void>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authenticationService: AuthenticationService,
    private consultationService: ConsultationService,
    private dialog: MatDialog
  ) {
    this.username = this.authenticationService.getLoggedInUsername();
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
    this.dialog.open(ConsultationEditDialogComponent, {
      width: '500px', data: {
        consultation: consultation,
        patientCNP: this.patientCNP
      }
    });
  }

  onMoreInfo(consultation: Consultation) {
    this.dialog.open(ConsultationMoreInfoComponent, {
      width: '600px', data: consultation
    });
  }

  onAddConsultation() {
    this.dialog.open(ConsultationEditDialogComponent, {
      width: '500px', data: {
        consultation: null,
        patientCNP: this.patientCNP
      }
    });
  }

  protected readonly ERole = ERole;
}
