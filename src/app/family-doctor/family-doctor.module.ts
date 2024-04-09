import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdPatientsListComponent } from './components/fd-patients-list/fd-patients-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [
    FdPatientsListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule
  ]
})
export class FamilyDoctorModule { }
