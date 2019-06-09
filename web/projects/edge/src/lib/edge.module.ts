import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { SectionBuilderComponent } from './builder/section-builder.component';
import { InputComponent } from './controls/input.component';

@NgModule({
  declarations: [SectionBuilderComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule, TextBoxModule],
  exports: [SectionBuilderComponent, InputComponent]
})
export class EdgeModule {}
