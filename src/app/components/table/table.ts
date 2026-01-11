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
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../column/column';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { TableInlineSort } from '../../services/table-inline-sort';
import { ColumnValueAccessor } from '../../types/table-types';

export type Behavior = 'inline' | 'event';
export interface SortEvent<T> {
  accessor: string | ColumnValueAccessor<T>;
  event: Sort;
}

/**
 * Generic table component using mat-table. It is ment to be use in conjonction with Column.
 * This aim to be an extensible class using content projection and ng-template.
 * It can parse Column component content to define his column behavior.
 * It exposes many events that you can listen to and inject some internal behavior through ng-template to
 * be used by a Column component.
 */
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
  private readonly tableInlineSortService = inject(TableInlineSort);

  protected readonly displayedColumns = signal<string[]>([]);
  protected readonly columnsToDisplayColumns = new Map<string, Column<T>>();

  /**
   * Array of data to display in that Table.
   * This can be use in one way or two way databinding.
   * This is not ment to be used with ngModel.
   */
  datas = model.required<T[]>();
  protected readonly dataSource = new MatTableDataSource<T>();

  /**
   * Determine the sort behavior.
   * Possible values:
   *   - 'inline' => perform sort operation inline, in memory on the underlying datas array
   *   - 'event' => send a SortEvent event through the (sortEvent) event listener so you can sort the
   *                datas yourself. After sorting you need to update datas input for sort to be applied
   *                to the table.
   */
  sortBehavior = input<Behavior>('inline');

  /*
   * Sort event emmited if sortBehavior is set to 'event'
   */
  sortEvent = output<SortEvent<T>>();

  private isInEdit = signal(false);

  @ContentChildren(Column)
  private readonly columns!: QueryList<Column<T>>;

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
      this.sortEvent.emit({ accessor, event });
    }
  }

  activateEdit(elem: T) {
    console.log('edit mode');
    this.isInEdit.set(true);
  }

  cancelEdit() {
    console.log('cancel edit');
    this.isInEdit.set(false);
  }

  saveEdit(elem: T) {
    console.log('save edit');
    this.isInEdit.set(false);
  }
}
