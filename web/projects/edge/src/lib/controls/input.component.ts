import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { identity } from 'ramda';
import { InputControlService } from './input-control.service';

export enum InputControlType {
  TextBox = 'TEXTBOX',
  DropDown = 'DROPDOWN',
  Date = 'DATE'
}

export class InputControlSetting {
  name: string;
  label?: string;
  type: string = InputControlType.TextBox;
  formControlName?: string;
  default?: any;
  domain?: string;
  parent?: string;
  min?: number;
  max?: number;
  email?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  permission: string;
  errorMessage?: string;
}

@Component({
  selector: 'edge-input',
  template: `
    <div [formGroup]="form">
      <label class="k-form-field">
        <span>{{ control.label }}</span>
        <input *ngIf="control.type === 'TEXTBOX'" class="k-textbox" placeholder="Your Name" [formControlName]="control.formControlName" />
        <textarea *ngIf="control.type === 'TEXTAREA'" kendoTextArea [formControlName]="control.formControlName"></textarea>
        <kendo-datepicker *ngIf="control.type === 'DATE'" [formControlName]="control.formControlName"></kendo-datepicker>
        <kendo-dropdownlist
          *ngIf="control.type === 'DROPDOWN'"
          #ddl
          [formControlName]="control.formControlName"
          [data]="inputControlService.getDomain(control.domain)"
          [textField]="'text'"
          [valueField]="'value'"
          [valuePrimitive]="true"
          [popupSettings]="{ width: 300 }"
        >
        </kendo-dropdownlist>
      </label>
    </div>
  `
})
export class InputComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: InputControlSetting;
  @ViewChild('ddl', { static: false }) public ddlRef;
  @ViewChild('datePicker', { static: false }) public datePickerRef;

  constructor(public inputControlService: InputControlService) {}

  ngOnInit() {
    if (this.control.type === 'DATE') {
      this.form.get(this.control.formControlName).setValue(new Date(this.form.get(this.control.formControlName).value));
    } else if (this.control.type === 'DROPDOWN' && this.control.parent) {
      this.form.get(this.control.parent).valueChanges.subscribe(() => {
        this.ddlRef.dataItem && this.form.get(this.control.parent).value !== this.ddlRef.dataItem.parent
          ? this.ddlRef.reset()
          : identity(0);
        this.ddlRef.data = this.inputControlService
          .getDomain(this.control.name)
          .filter(e => e.parent === this.form.get(this.control.parent).value);
      });
    }
  }
}
