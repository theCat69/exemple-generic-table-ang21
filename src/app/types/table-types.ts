export type SimpleValue = string | number | Date | null | undefined;
export type ColumnValueAccessor<T> = string | ((elem: T) => SimpleValue);
