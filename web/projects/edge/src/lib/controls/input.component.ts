import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlService } from './input-control.service';

export enum InputControlType {
  TextBox = 'TEXTBOX',
  DropDown = 'DROPDOWN',
  Date = 'DATE'
}

export class InputControlSetting {
  name: string;
  label: string;
  type: string = InputControlType.TextBox;
  formControlName: string;
  domain: string;
}

@Component({
  selector: 'edge-input',
  template: `
    <div [formGroup]="form">
      <label class="k-form-field">
        <span>{{ control.label }}</span>
        <input *ngIf="control.type === 'TEXTBOX'" class="k-textbox" placeholder="Your Name" [formControlName]="control.formControlName" />
        <textarea *ngIf="control.type === 'TEXTAREA'" kendoTextArea [formControlName]="control.formControlName"></textarea>
      </label>
    </div>
  `
})
export class InputComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: InputControlSetting;

  constructor(private inputControlService: InputControlService) {}

  ngOnInit() {}
}
