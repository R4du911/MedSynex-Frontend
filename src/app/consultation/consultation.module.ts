import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationListComponent } from './components/consultation-list/consultation-list.component';
import { ConsultationMoreInfoComponent } from './components/consultation-more-info/consultation-more-info.component';



@NgModule({
  declarations: [
    ConsultationListComponent,
    ConsultationMoreInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConsultationModule { }
