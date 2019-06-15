import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PageBuilderComponent } from './builder/page-builder.component';
import { SectionBuilderComponent } from './builder/section-builder.component';
import { GridComponent } from './controls/grid.component';
import { InputComponent } from './controls/input.component';

@NgModule({
  declarations: [SectionBuilderComponent, InputComponent, PageBuilderComponent, GridComponent],
  imports: [CommonModule, ReactiveFormsModule, TextBoxModule, DateInputsModule, DropDownsModule, LayoutModule, DialogsModule, GridModule],
  exports: [SectionBuilderComponent, InputComponent, PageBuilderComponent, GridComponent]
})
export class EdgeModule {}
