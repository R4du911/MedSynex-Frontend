import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationListComponent } from './components/consultation-list/consultation-list.component';
import { ConsultationMoreInfoComponent } from './components/consultation-more-info/consultation-more-info.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HasRolesDirective} from "../core/authorization/directives/has-roles.directive";
import { ConsultationEditDialogComponent } from './components/consultation-edit-dialog/consultation-edit-dialog.component';



@NgModule({
    declarations: [
        ConsultationListComponent,
        ConsultationMoreInfoComponent,
        ConsultationEditDialogComponent
    ],
    exports: [
        ConsultationListComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    HasRolesDirective
  ]
})
export class ConsultationModule { }
