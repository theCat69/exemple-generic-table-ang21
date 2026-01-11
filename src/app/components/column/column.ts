import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { SimpleValue } from '../../types/table-types';

/**
 * Column component
 *
 * This component is a template driven composite used with the TableComponent
 * @param T object type used as datas (T[]) in the Table component
 *
 */
@Component({
  selector: 'app-column',
  template: '',
  host: {
    class: 'simple-column cdk-visually-hidden',
    '[attr.ariaHidden]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column<T> {
  /** Column name that should be used to reference this column.
   * By default, this will be used to access the column value as it was keyof T.
   * */
  prop = input.required<string>();
  /** Column header label value */
  label = input<string>();
  /** If the prop value is not sufficient to access the underlying value for the table cell you can
   * provide an optional valueAcessor */
  valueAccessor = input<(elem: T) => SimpleValue>();

  /** Activate sort for this column. Default: false */
  sortable = input(false, { transform: booleanAttribute });
  /** Activate edition for this column. Default: false */
  editable = input(false, { transform: booleanAttribute });
  /** Activate drag n drop behavior to reorder this column. Default: true */
  draggable = input(true);

  /** Override header cell background color */
  styleHeaderBgColor = input<string>();
  /**
   * Cell padding css property for the non header cells.
   * Can be usefull to set to "0" if you want full control over
   * cell content display.
   * */
  cellPadding = input<string>();

  @ContentChild('cell', { static: true })
  private _cellTemplate?: TemplateRef<{ $implicit: T }>;
  @ContentChild('header', { static: true })
  private _headerTemplate?: TemplateRef<{}>;

  /**
   * Overridable getter for the header cell template.
   * This will be projected into table header if not undefined
   *
   * @return TemplateRef of the headerTemplate if present
   * */
  get headerTemplate(): TemplateRef<any> | undefined {
    return this._headerTemplate;
  }

  /**
   * Overridable getter for non header cells template.
   * This will be projected into table non header cells if not undefined
   *
   * @return TemplateRef of the cellTemplate if present
   * */
  get cellTemplate(): TemplateRef<any> | undefined {
    return this._cellTemplate;
  }
}
