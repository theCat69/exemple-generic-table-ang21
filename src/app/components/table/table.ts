import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  effect,
  input,
  QueryList,
  signal,
  ViewChild
} from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../column/column';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, DragDropModule, CdkDropList, MatButtonModule, NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Table<T> implements AfterContentInit {

  displayedColumns = signal<string[]>([]);
  columnsToDisplayColumns: Map<string, Column<T>> = new Map();

  datas = input.required<T[]>();
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

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
    this.columns.forEach(col => {
      this.columnsToDisplayColumns.set(col.prop(), col);
    })
    this.displayedColumns.set(this.columns.map(c => c.prop()));
  }

  onPageChange(event: PageEvent) {
    console.log(event);
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    this.displayedColumns.update(cols => {
      moveItemInArray(
        cols,
        event.previousIndex,
        event.currentIndex
      );
      return cols;
    });
  }
}
