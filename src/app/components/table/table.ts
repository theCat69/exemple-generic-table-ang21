import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  effect,
  inject,
  input,
  model,
  output,
  QueryList,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../column/column';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { TableInlineSort } from '../../services/table-inline-sort';
import { ColumnValueAccessor } from '../../types/table-types';

export type Behavior = 'inline' | 'event';
export type SortEvent<T> = { accessor: string | ColumnValueAccessor<T>; event: Sort };

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    MatButtonModule,
    NgTemplateOutlet,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table<T> implements AfterContentInit {
  tableInlineSortService = inject(TableInlineSort);

  displayedColumns = signal<string[]>([]);
  columnsToDisplayColumns: Map<string, Column<T>> = new Map();

  datas = model.required<T[]>();
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  sortBehavior = input<Behavior>('inline');
  onSort = output<SortEvent<T>>();

  @ViewChild(MatTable, { static: true })
  table!: MatTable<T>;
  @ContentChildren(Column)
  columns!: QueryList<Column<T>>;

  constructor() {
    effect(() => {
      this.dataSource.data = this.datas();
    });
  }

  ngAfterContentInit() {
    this.columns.forEach((col) => {
      this.columnsToDisplayColumns.set(col.prop(), col);
    });
    this.displayedColumns.set(this.columns.map((c) => c.prop()));
  }

  onPageChange(event: PageEvent) {
    console.log(event);
  }

  onDropColumn(event: CdkDragDrop<string[]>) {
    this.displayedColumns.update((cols) => {
      moveItemInArray(cols, event.previousIndex, event.currentIndex);
      return cols;
    });
  }

  onSortChange(event: Sort) {
    const sortColumn = this.columnsToDisplayColumns.get(event.active)!;
    const accessor = sortColumn.valueAccessor() ?? sortColumn.prop();
    if (this.sortBehavior() === 'inline') {
      this.datas.update((dataArray) =>
        this.tableInlineSortService.sortArray(dataArray, event.direction, accessor),
      );
    } else if (this.sortBehavior() === 'event') {
      this.onSort.emit({ accessor, event });
    }
  }
}
