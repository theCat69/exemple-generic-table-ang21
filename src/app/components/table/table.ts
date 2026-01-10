import {
  AfterContentInit,
  AfterViewInit,
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
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, DragDropModule, CdkDropList],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Table<T> implements AfterContentInit, AfterViewInit {
  displayedColumns = signal<string[]>([]);
  datas = input.required<T[]>();
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  @ViewChild(MatTable, { static: true }) table!: MatTable<T>;
  @ViewChild(CdkDropList) dropList!: CdkDropList;

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
    setTimeout(() => {
      const headerRow = document.querySelector('mat-header-row');
      const headerCells = document.querySelectorAll('mat-header-cell');
      console.log("Header row:", headerRow);
      console.log("Header cells:", headerCells);
      console.log("Has cdkDropList?", headerRow?.hasAttribute('cdkdroplist'));
      console.log("Cells with cdkDrag?", Array.from(headerCells).map(c => c.hasAttribute('cdkdrag')));
    }, 1000);
  }

  ngAfterViewInit() {
    const draggables: CdkDrag[] = [];
    this.columns.forEach(col => {
      if (col.dragDirective) {
        draggables.push(col.dragDirective);
      }
    });

    if (this.dropList && draggables.length > 0) {
      console.log('Connecting', draggables.length, 'draggables to drop list');
      // Manually register each drag with the drop list
      draggables.forEach(drag => {
        this.dropList.addItem(drag);
        drag._dragRef._withDropContainer(this.dropList._dropListRef);
      });
      // this.dropList.r;
    }
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

  dropListEvent(event: CdkDragDrop<string[]>) {
    console.log("dropped");
    console.log(event);
  }
}
