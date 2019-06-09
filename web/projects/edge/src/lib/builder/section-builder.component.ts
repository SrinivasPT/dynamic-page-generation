import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlSetting } from '../controls/input.component';

@Component({
  selector: 'edge-section-builder',
  template: `
    <div class="d-flex flex-wrap">
      <ng-container *ngFor="let control of controls">
        <edge-input class="col-md-3" [form]="form" [control]="control"></edge-input>
      </ng-container>
    </div>
  `
})
export class SectionBuilderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controls: InputControlSetting[];

  constructor() {}

  ngOnInit() {}
}
