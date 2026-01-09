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

@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T> implements AfterViewInit, AfterContentInit, OnInit {
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

  ngOnInit() {
    console.log('onInit');
  }

  ngAfterContentInit() {
    this.columns.forEach(col => {
      this.table.addColumnDef(col.columnDef);
    });
    this.displayedColumns.set(this.columns.map(c => c.prop()));
  }

  ngAfterViewInit() {
    console.log('afterViewInit');
  }
}
