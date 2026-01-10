import { ChangeDetectionStrategy, Component, ContentChild, input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef, MatTableModule } from '@angular/material/table';
import { NgTemplateOutlet } from '@angular/common';
import { CdkDragDrop, CdkDragStart, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  imports: [MatTableModule, NgTemplateOutlet, DragDropModule],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  host: {
    'class': 'simple-column cdk-visually-hidden',
    '[attr.ariaHidden]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Column<T> implements OnInit {
  /** Column name that should be used to reference this column. */
  prop = input.required<string>();
  label = input<string>();
  styleHeaderBgColor = input<string>('red');

  //overridable styles for columns
  cellPadding = input<string>();

  @ViewChild(MatColumnDef, { static: true }) public columnDef!: MatColumnDef;
  @ViewChild(MatCellDef, { static: true }) public cellDef!: MatCellDef;
  @ViewChild(MatHeaderCellDef, { static: true }) public headerCellDef!: MatHeaderCellDef;
  @ViewChild(MatFooterCellDef, { static: true }) public footerCellDef!: MatFooterCellDef;

  @ContentChild(TemplateRef, { static: true })
  cellTemplate!: TemplateRef<{ $implicit: T }>;

  ngOnInit(): void {
    if (this.columnDef) {
      this.columnDef.name = this.prop();
      this.columnDef.cell = this.cellDef;
      this.columnDef.headerCell = this.headerCellDef;
      this.columnDef.footerCell = this.footerCellDef;
    }
  }

  startedDrag(event: CdkDragStart) {
    console.log("started");
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("dropped");
    console.log(event);
  }

  dropList(event: CdkDragDrop<string[]>) {
    console.log("dropped");
    console.log(event);
  }

}
