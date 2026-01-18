import { signal, WritableSignal } from '@angular/core';

export type SimpleValue = string | number | Date | null | undefined;
export type ColumnValueAccessor<T> = string | ((elem: T) => SimpleValue);

export interface RowMetada<T> {
  inEdit: WritableSignal<boolean>;
}

export type WithRowMetadata<T> = T & { __rowMetadata: RowMetada<T> };

export function withMetadata<T extends object>(
  obj: T,
  rowMetadata: RowMetada<T>,
): WithRowMetadata<T> {
  return {
    ...obj,
    __rowMetadata: { ...rowMetadata },
  };
}

export function isWithRowMetadata<T>(
  value: unknown
): value is WithRowMetadata<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "__rowMetadata" in value
  );
}

export function toSignalArrayWithRowMetada<T extends object>(
  items: T[],
): WritableSignal<WithRowMetadata<T>>[] {
  return items.map((item) => {
    return signal(
      withMetadata(item, {
        inEdit: signal(false)
      }),
    );
  });
}
