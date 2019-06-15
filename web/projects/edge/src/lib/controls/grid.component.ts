import { AfterViewInit, Component, ContentChildren, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ColumnComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { append, clone, concat, difference, filter, identity, isEmpty, keys, pluck, propEq } from 'ramda';

export enum GridEditAction {
  REDIRECT_AT_PRENT_LEVEL = 1,
  REDIRECT_AT_CHILD_LEVEL,
  OPEN_POPUP
}

export class ColumnConfig {
  name: string;
  dataType: string;
  permission: string;
}

export class GridConfig {
  name: string;
  type: string;
  gridType: string;
  columns: ColumnConfig[];
}

export class GridSetting {
  public gridView: GridDataResult;
  public gridData: any[];
  public skip: number;
  public pageSize: number;
  public showEditForm: false;
  // tslint:disable-next-line: ban-types
  public content: string | TemplateRef<any> | Function;
  public editAction: number;

  constructor(
    data: any[] = [],
    // tslint:disable-next-line: ban-types
    detailDialogComponent: string | TemplateRef<any> | Function = '',
    editAction: number = GridEditAction.REDIRECT_AT_CHILD_LEVEL
  ) {
    this.skip = 0;
    this.pageSize = 3;
    this.gridData = clone(data);
    this.gridView = { data: data.slice(this.skip, this.skip + this.pageSize), total: data.length };
    this.showEditForm = false;
    this.content = detailDialogComponent;
    this.editAction = editAction;
  }

  refresh(data) {
    this.gridData = clone(data);
    this.gridView = { data: data.slice(this.skip, this.skip + this.pageSize), total: data.length };
  }

  reset() {
    this.skip = 0;
  }
}

@Component({
  selector: 'edge-grid',
  template: `
    <kendo-grid
      #grid
      [data]="gridSettings.gridView"
      [pageable]="true"
      [pageSize]="gridSettings.pageSize"
      [skip]="gridSettings.skip"
      (pageChange)="pageChange($event)"
    >
      <kendo-grid-column title="Edit">
        <ng-template kendoGridCellTemplate let-dataItem>
          <button kendoGridEditCommand type="button" (click)="onRowEdit(dataItem)">Edit</button>
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
  `
})
export class GridComponent implements AfterViewInit, OnChanges {
  @Input() public gridSettings: GridSetting;
  @Input() public gridConfig: GridConfig;
  @ViewChild('grid', { static: false }) public gridRef;
  @ContentChildren(ColumnComponent) public gridColumns;

  constructor(private dialogService: DialogService, private activetedRoute: ActivatedRoute, private router: Router) {}

  ngAfterViewInit() {
    this.gridRef.columns.reset(this.getColumns());
  }

  ngOnChanges() {
    this.gridRef ? this.gridRef.columns.reset(this.getColumns()) : identity(0);
  }

  getColumns() {
    // designerColumns are the custom columns defined by the developer while using the grid
    const designerColumns: any[] = this.gridColumns.toArray();
    const designerColumnFieldNames: any[] = pluck('field', designerColumns);
    const hiddenColumns = pluck('name', filter(propEq('permission', 'HIDDEN'), this.gridConfig.columns) as Array<any>);
    const dynamicColumns = this.getDynamicColumnsExcludingDesignerColumns(append(designerColumnFieldNames, hiddenColumns));
    return concat(designerColumns, dynamicColumns);
  }

  getDynamicColumnsExcludingDesignerColumns(excludeColumnList: any[] = []) {
    const dynamicColumns: any[] = [];
    if (isEmpty(this.gridSettings.gridView.data[0])) {
      return [];
    }

    difference(keys(this.gridSettings.gridView.data[0]), excludeColumnList).forEach(field => {
      const columnComponent: ColumnComponent = new ColumnComponent();
      columnComponent.field = field.toString();
      columnComponent.title = this.getLabel(field.toString());
      dynamicColumns.push(columnComponent);
    });

    return dynamicColumns;
  }

  pageChange(event: PageChangeEvent) {
    this.gridSettings.skip = event.skip;
    this.gridSettings.gridView = {
      data: clone(this.gridSettings.gridData).slice(this.gridSettings.skip, this.gridSettings.skip + this.gridSettings.pageSize),
      total: this.gridSettings.gridView.total
    };
  }

  getLabel = (label: string) => (label.charAt(0).toUpperCase() + label.slice(1)).split(/(?=[A-Z])/).join(' ');

  onRowEdit(data) {
    if (this.gridSettings.editAction === GridEditAction.OPEN_POPUP) {
      this.openEditDialog(data);
    } else if (this.gridSettings.editAction === GridEditAction.REDIRECT_AT_CHILD_LEVEL) {
      this.router.navigate(['./', { id: data.id }], { relativeTo: this.activetedRoute });
    }
  }

  private openEditDialog(data: any) {
    const dialogRef = this.dialogService.open({
      title: 'Confirmation?',
      content: this.gridSettings.content,
      actions: [{ text: 'Yes', primary: true }, { text: 'No' }]
    });
    const dialogComponentInstance = dialogRef.content.instance;
    dialogComponentInstance.formData = data;
  }
}
