import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlSetting } from '../controls/input.component';

@Component({
  selector: 'edge-section-builder',
  template: `
    <ng-container *ngFor="let control of controls">
      <edge-input [form]="form" [control]="control"></edge-input>
    </ng-container>
  `
})
export class SectionBuilderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controls: InputControlSetting[];

  constructor() {}

  ngOnInit() {}
}
