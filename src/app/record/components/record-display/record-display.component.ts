import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-record-display',
  templateUrl: './record-display.component.html',
  styleUrls: ['./record-display.component.css']
})
export class RecordDisplayComponent {
  activeComponent: string = 'consultation';
  patientCNP : string = '';

  constructor(
    private route: ActivatedRoute
  ) {
    const componentParam : string | null = this.route.snapshot.paramMap.get('cnp');

    if(componentParam) {
      this.patientCNP = componentParam;
    }

  }

  setActiveComponent(component: string): void {
    this.activeComponent = component;
  }
}
