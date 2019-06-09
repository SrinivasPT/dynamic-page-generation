import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EdgeModule } from 'projects/edge/src/public-api';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [CommonModule, ReactiveFormsModule, EmployeeRoutingModule, EdgeModule]
})
export class EmployeeModule {}
