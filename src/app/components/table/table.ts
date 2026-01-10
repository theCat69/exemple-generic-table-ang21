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
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, DragDropModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Table<T> implements AfterContentInit {
  displayedColumns = signal<string[]>([]);
  datas = input.required<T[]>();
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  @ViewChild(MatTable, { static: true }) table!: MatTable<T>;

  @ContentChildren(Column) columns!: QueryList<Column<T>>;

  constructor() {

    effect(() => {
      this.dataSource.data = this.datas();
    });
  }

  ngAfterContentInit() {
    this.columns.forEach(col => {
      this.table.addColumnDef(col.columnDef);
    });
    this.displayedColumns.set(this.columns.map(c => c.prop()));
  }

  onPageChange(event: PageEvent) {
    console.log(event);
  }

  entered(event: any) {
    console.log(event);
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    console.log('drop column');
    console.log('event');
    this.displayedColumns.update(() => {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return [...event.container.data];
    })
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
