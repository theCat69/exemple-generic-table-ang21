import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { ColumnValueAccessor, SimpleValue } from '../types/table-types';

@Injectable({
  providedIn: 'root',
})
export class TableInlineSort {
  sortArray<T>(array: T[], direction: SortDirection, accessor: ColumnValueAccessor<T>): T[] {
    if (direction === '') {
      return array;
    }

    return [...array].sort((a, b) => {
      const valueA = this.accessValue(a, accessor);
      const valueB = this.accessValue(b, accessor);

      // Handle null / undefined
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return direction === 'asc' ? -1 : 1;
      if (valueB == null) return direction === 'asc' ? 1 : -1;

      // Numbers
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Dates
      if (valueA instanceof Date && valueB instanceof Date) {
        return direction === 'asc'
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      // Fallback to string comparison
      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();

      if (strA < strB) return direction === 'asc' ? -1 : 1;
      if (strA > strB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private accessValue<T>(elem: T, accessor: ColumnValueAccessor<T>): SimpleValue {
    if (typeof accessor === 'function') {
      return accessor(elem);
    }
    return (elem as Record<string, SimpleValue>)[accessor];
  }
}
