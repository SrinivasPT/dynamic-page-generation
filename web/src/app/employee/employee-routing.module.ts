import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeResolver } from './employee-resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailComponent,
    resolve: { employee: EmployeeResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
