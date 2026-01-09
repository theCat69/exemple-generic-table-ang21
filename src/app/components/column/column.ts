import {Component, HostBinding, Input, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {
  MatCellDef,
  MatColumnDef,
  MatFooterCellDef,
  MatHeaderCellDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-column',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column<T> implements OnInit, OnDestroy {
  /** Column name that should be used to reference this column. */
  @Input() prop = '';
  @Input() label: string | undefined;

  constructor(@Optional() public table: MatTable<unknown>) {}

  @HostBinding('attr.ariaHidden') ariaHidden!: true;
  @HostBinding('class') classes!: 'column-template cdk-visually-hidden';

  @ViewChild(MatColumnDef, { static: true }) columnDef!: MatColumnDef;
  @ViewChild(MatCellDef, { static: true }) cellDef!: MatCellDef;
  @ViewChild(MatHeaderCellDef, { static: true }) headerCellDef!: MatHeaderCellDef;
  @ViewChild(MatFooterCellDef, { static: true }) footerCellDef!: MatFooterCellDef;

  ngOnInit(): void {
    if (this.table && this.columnDef) {
      this.columnDef.name = this.prop;
      this.columnDef.cell = this.cellDef;
      this.columnDef.headerCell = this.headerCellDef;
      this.columnDef.footerCell = this.footerCellDef;
      this.table.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.removeColumnDef(this.columnDef);
    }
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
