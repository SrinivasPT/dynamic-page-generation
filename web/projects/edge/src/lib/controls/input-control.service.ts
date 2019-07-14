import { Injectable } from '@angular/core';
import { isNil } from 'ramda';
import { PageConfig } from '../builder/page-builder.component';
import { SectionConfig } from '../builder/section-builder.component';
import { ColumnConfig, GridConfig } from './grid.component';
import { InputControlSetting } from './input.component';

@Injectable({ providedIn: 'root' })
export class InputControlService {
  lookup = {
    country: [{ text: 'India', value: 'INDIA' }, { text: 'USA', value: 'USA' }],
    state: [
      { text: 'Amaravathi', value: 'AMARAVATHI', parent: 'INDIA' },
      { text: 'Hyderabad', value: 'HYDERABAD', parent: 'INDIA' },
      { text: 'Pune', value: 'PUNE', parent: 'INDIA' },
      { text: 'Tampa', value: 'TAMPA', parent: 'USA' },
      { text: 'Harrisburg', value: 'HARRISBURG', parent: 'USA' }
    ]
  };

  constructor() {}
  public sanitizePageConfig(pageConfig: PageConfig): PageConfig {
    pageConfig.sections.forEach(section => {
      if (section.type === 'FREE_FORM') {
        this.sanitizeFreeFormSectionConfig(section as SectionConfig);
      } else if (section.type === 'GRID') {
        this.sanitizeGridColumnConfig(section as GridConfig);
      }
    });
    return pageConfig;
  }

  public sanitizeFreeFormSectionConfig(section: SectionConfig) {
    section.controls.map(control => this.sanitizeInputControlSetting(control));
  }

  public sanitizeGridColumnConfig(section: GridConfig) {
    section.columns.map(column => this.sanitizeColumnSetting(column));
  }

  public sanitizeInputControlSetting(control: InputControlSetting) {
    control.label = this.getLabel(control.label, control.name);
    control.formControlName = isNil(control.formControlName) ? control.name : control.formControlName;
  }

  public sanitizeColumnSetting(column: ColumnConfig) {}

  private getLabel(label: string, name: string): string {
    return isNil(label) ? (name.charAt(0).toUpperCase() + name.slice(1)).split(/(?=[A-Z])/).join(' ') : label;
  }

  public getDomain(domain: string): Array<any> {
    return this.lookup[domain];
  }
}
