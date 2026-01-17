import { signal, Signal, WritableSignal } from '@angular/core';

/**
 * Transforms an array of items into an array of writable signals
 * @param items - Array of items to convert
 * @returns Array of writable signals
 */
export function toSignalArray<T>(items: T[]): WritableSignal<T>[] {
  return items.map((item) => {
    return signal(item);
  });
}

/**
 * Transforms an array of items into an array of readonly signals
 * @param items - Array of items to convert
 * @returns Array of readonly signals
 */
export function toReadonlySignalArray<T>(items: T[]): Signal<T>[] {
  return items.map((item) => signal(item));
}
