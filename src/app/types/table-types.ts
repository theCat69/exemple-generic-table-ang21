import { signal, WritableSignal } from '@angular/core';

export type SimpleValue = string | number | Date | null | undefined;
export type ColumnValueAccessor<T> = string | ((elem: T) => SimpleValue);

export interface RowMetada<T> {
  modified: boolean;
  orignalValues?: string;
}

export type WithRowMetadata<T> = T & RowMetada<T>;

export function withMetadata<T extends object>(
  obj: T,
  rowMetadata: RowMetada<T>,
): WithRowMetadata<T> {
  return { ...obj, ...rowMetadata };
}

export function toSignalArrayWithRowMetada<T extends object>(
  items: T[],
): WritableSignal<WithRowMetadata<T>>[] {
  return items.map((item) => {
    return signal(
      withMetadata(item, {
        modified: false,
      }),
    );
  });
}

export function restoreOriginalValues<T>(elem: WithRowMetadata<T>): T {
  return JSON.parse(elem.orignalValues!);
}
