import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputControlService } from 'projects/edge/src/public-api';

@Component({
  selector: 'app-employee-detail',
  template: `
    <p>Employee Detail</p>
    <edge-section-builder [form]="form" [controls]="this.pageConfig.sections[0].fields"></edge-section-builder>
  `
})
export class EmployeeDetailComponent implements OnInit {
  form: FormGroup;
  data: any;
  pageConfig: any;

  constructor(private fb: FormBuilder, private inputControlService: InputControlService) {}

  ngOnInit() {
    this.loadData();
    this.form = this.fb.group(this.data);
  }

  loadData() {
    this.pageConfig = {
      name: 'Employee',
      sections: [
        {
          name: 'Employee Details',
          type: 'FREE_FORM',
          fields: [
            { name: 'firstName', type: 'TEXTBOX', minLength: 0, maxLength: 50, editable: 'NOT_REQUIRED_EDITABLE' },
            { name: 'lastName', type: 'TEXTBOX', minLength: 0, maxLength: 50, editable: 'NOT_REQUIRED_EDITABLE' },
            { name: 'email', type: 'TEXTBOX', minLength: 0, maxLength: 50, editable: 'NOT_REQUIRED_EDITABLE' },
            { name: 'dob', type: 'DATE', minLength: 0, maxLength: 50, editable: 'NOT_REQUIRED_EDITABLE' },
            {
              name: 'country',
              type: 'dropdown',
              domain: 'country',
              minLength: 0,
              maxLength: 50,
              editable: 'NOT_REQUIRED_EDITABLE'
            },
            { name: 'state', type: 'dropdown', domain: 'state', minLength: 0, maxLength: 50, editable: 'NOT_REQUIRED_EDITABLE' }
          ]
        },
        {
          name: 'Address',
          type: 'GRID',
          gridType: null,
          fields: [
            { name: 'addressLineOne', dataType: 'string' },
            { name: 'addressLineTwo', dataType: 'string' },
            { name: 'city', dataType: 'string' },
            { name: 'state', dataType: 'code', domain: 'state' },
            { name: 'country', dataType: 'code', domain: 'country' }
          ]
        }
      ]
    };

    this.data = {
      firstName: 'Srinivas',
      lastName: 'Peeta',
      email: 'speeta@gmail.com',
      dob: new Date(),
      country: 'INDIA',
      state: 'TELANGANA'
    };

    this.pageConfig.sections[0].fields.map(e => (e = this.inputControlService.sanitizeInputControlSetting(e)));
  }
}
