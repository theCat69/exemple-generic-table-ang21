import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  effect,
  input,
  OnInit,
  QueryList,
  signal,
  ViewChild
} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Column} from '../column/column';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
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
}
