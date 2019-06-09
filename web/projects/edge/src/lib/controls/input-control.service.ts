import { Injectable } from '@angular/core';
import { isNil } from 'ramda';
import { InputControlSetting } from './input.component';

@Injectable({ providedIn: 'root' })
export class InputControlService {
  constructor() {}
  public sanitizeInputControlSetting(control: InputControlSetting): InputControlSetting {
    control.label = this.getLabel(control.label, control.name);
    control.formControlName = isNil(control.formControlName) ? control.name : control.formControlName;
    return control;
  }

  private getLabel(label: string, name: string): string {
    return isNil(label) ? (name.charAt(0).toUpperCase() + name.slice(1)).split(/(?=[A-Z])/).join(' ') : label;
  }
}
