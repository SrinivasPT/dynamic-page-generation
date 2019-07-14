import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { identity, isNil } from 'ramda';
import { InputControlSetting } from '../controls/input.component';

export class SectionConfig {
  name: string;
  type: string;
  controls: InputControlSetting[];
}

@Component({
  selector: 'edge-section-builder',
  template: `
    <kendo-panelbar class="mb-3 pb-3">
      <kendo-panelbar-item [title]="section.name" expanded="true">
        <ng-template kendoPanelBarContent>
          <fieldset>
            <span class="d-flex flex-wrap">
              <ng-container *ngFor="let control of section.controls">
                <edge-input class="col-md-3" [form]="sectionFormGroup" [control]="control"></edge-input>
              </ng-container>
            </span>
          </fieldset>
        </ng-template>
      </kendo-panelbar-item>
    </kendo-panelbar>
  `
})
export class SectionBuilderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() section: SectionConfig;
  sectionFormGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.sectionFormGroup = this.createFormGroup(this.section);
    this.form.addControl(this.section.name, this.sectionFormGroup);
  }

  createFormGroup(section: SectionConfig): FormGroup {
    const formControls = {};
    // section.controls = filter(control => control.permission !== 'HIDDEN', section.controls);
    section.controls.forEach(control => (formControls[control.formControlName] = this.createFormControl(control)));
    return new FormGroup(formControls);
  }

  createFormControl(control: InputControlSetting): AbstractControl {
    const formControl: FormControl = new FormControl(null, this.getValidationRules(control));
    return formControl;
  }

  getValidationRules(control: InputControlSetting): any[] {
    const validationsArray = [];
    isNil(control.max) ? identity(1) : validationsArray.push(Validators.max(control.max));
    isNil(control.min) ? identity(1) : validationsArray.push(Validators.min(control.min));
    isNil(control.maxLength) ? identity(1) : validationsArray.push(Validators.maxLength(control.maxLength));
    isNil(control.minLength) ? identity(1) : validationsArray.push(Validators.minLength(control.minLength));
    isNil(control.email) ? identity(1) : validationsArray.push(Validators.email);
    isNil(control.pattern) ? identity(1) : validationsArray.push(Validators.pattern(control.pattern));
    !isNil(control.permission) && control.permission ? validationsArray.push(Validators.required) : identity(0);

    return validationsArray;
  }
}
