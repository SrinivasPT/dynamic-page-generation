import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridConfig, GridSetting } from '../controls/grid.component';
import { SectionConfig } from './section-builder.component';

export class PageConfig {
  name: string;
  sections: Array<SectionConfig | GridConfig>;
}

@Component({
  selector: 'edge-page-builder',
  template: `
    <div [formGroup]="form">
      <ng-container *ngFor="let section of pageConfig.sections">
        <ng-container *ngIf="section.type === 'FREE_FORM'">
          <div class="d-flex flex-wrap">
            <edge-section-builder class="w-100" [form]="form" [section]="section"></edge-section-builder>
          </div>
        </ng-container>
        <ng-container *ngIf="section.type === 'GRID'">
          <kendo-panelbar class="mb-3">
            <kendo-panelbar-item [title]="section.name" expanded="true">
              <ng-template kendoPanelBarContent>
                <edge-grid [gridSettings]="gridSettings.get(section.name)" [gridConfig]="section"></edge-grid
              ></ng-template>
            </kendo-panelbar-item>
          </kendo-panelbar>
        </ng-container>
      </ng-container>
    </div>
  `
})
export class PageBuilderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() pageConfig: any;
  @Input() gridSettings: Map<string, GridSetting>;

  constructor() {}

  ngOnInit() {}
}
