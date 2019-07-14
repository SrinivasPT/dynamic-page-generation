import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageConfig } from 'projects/edge/src/lib/builder/page-builder.component';
import { GridSetting } from 'projects/edge/src/lib/controls/grid.component';
import { InputControlService } from 'projects/edge/src/public-api';
import { identity } from 'ramda';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-employee-detail',
  template: `
    <form [formGroup]="form" class="k-form">
      <p>Employee Detail</p>
      <edge-page-builder [form]="form" [pageConfig]="pageConfig" [gridSettings]="gridSettings"></edge-page-builder>
    </form>
    <p>{{ form.value | json }}</p>
  `
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailComponent implements OnInit {
  form: FormGroup;
  data: any;
  pageConfig: PageConfig;
  gridSettings: Map<string, GridSetting> = new Map();

  constructor(private fb: FormBuilder, private inputControlService: InputControlService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = this.fb.group({ dummy: 'Test' });
    this.getPageConfig();
    this.generateGridSettings();

    this.route.data.subscribe(data => {
      this.data = data.employee;
      this.form.patchValue(this.data);
      this.updateGridSettings();
    });

    // this.loadData().subscribe(data => {
    //   this.data = data;
    //   this.form.patchValue(this.data);
    //   this.updateGridSettings();
    // });

    // ngOnInit() {
    //   this.route.data
    //     .subscribe((data: { crisis: Crisis }) => {
    //       this.editName = data.crisis.name;
    //       this.crisis = data.crisis;
    //     });
    // }
  }

  generateGridSettings() {
    this.pageConfig.sections.forEach(section => {
      section.type === 'GRID' ? this.gridSettings.set(section.name, new GridSetting([])) : identity(0);
    });
  }

  updateGridSettings() {
    this.pageConfig.sections.forEach(section => {
      if (section.type === 'GRID') {
        const gridSetting: GridSetting = this.gridSettings.get(section.name);
        gridSetting.refresh(this.data[section.name]);
        this.gridSettings.set(section.name, gridSetting);
      }
    });
  }

  getPageConfig() {
    this.pageConfig = {
      name: 'employee',
      sections: [
        {
          name: 'employeeDetailsOne',
          type: 'FREE_FORM',
          controls: [
            { name: 'firstName', type: 'TEXTBOX', minLength: 0, maxLength: 50, permission: 'NOT_REQUIRED_EDITABLE' },
            { name: 'lastName', type: 'TEXTBOX', minLength: 0, maxLength: 50, permission: 'NOT_REQUIRED_EDITABLE' },
            { name: 'email', type: 'TEXTBOX', minLength: 0, maxLength: 50, permission: 'NOT_REQUIRED_EDITABLE' },
            { name: 'dob', type: 'DATE', minLength: 0, maxLength: 50, permission: 'NOT_REQUIRED_EDITABLE' },
            {
              name: 'country',
              type: 'DROPDOWN',
              domain: 'country',
              minLength: 0,
              maxLength: 50,
              permission: 'NOT_REQUIRED_EDITABLE'
            },
            {
              name: 'state',
              type: 'DROPDOWN',
              domain: 'state',
              parent: 'country',
              minLength: 0,
              maxLength: 50,
              permission: 'NOT_REQUIRED_EDITABLE'
            }
          ]
        },
        {
          name: 'addressOne',
          type: 'GRID',
          gridType: null,
          columns: [
            { name: 'addressLineOne', dataType: 'string', permission: 'HIDDEN' },
            { name: 'addressLineTwo', dataType: 'string', permission: 'VISIBLE' },
            { name: 'city', dataType: 'string', permission: 'VISIBLE' },
            { name: 'state', dataType: 'code', permission: 'VISIBLE' },
            { name: 'country', dataType: 'code', permission: 'VISIBLE' }
          ]
        }
      ]
    };
    this.inputControlService.sanitizePageConfig(this.pageConfig);
  }

  loadData(): Observable<any> {
    return of({
      employeeDetailsOne: {
        firstName: 'Srinivas',
        lastName: 'Peeta',
        email: 'speeta@gmail.com',
        dob: new Date('1/1/2018'),
        country: 'INDIA',
        state: 'HYDERABAD'
      },
      addressOne: [
        { addressLineOne: 'Aparna Cyber Commune', addressLineTwo: 'Nallagandla', city: 'Hyderabad', state: 'Telangana', country: 'India' },
        { addressLineOne: 'Vijaya Sai Residensy', addressLineTwo: 'Miyapur', city: 'Hyderabad', state: 'Telangana', country: 'India' },
        { addressLineOne: 'Rachel Terrace', addressLineTwo: 'Parcipenny', city: '', state: 'New Jersy', country: 'USA' }
      ]
    }).pipe(delay(0));
  }
}
