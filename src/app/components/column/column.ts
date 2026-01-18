import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SimpleValue } from '../../types/table-types';
import { SimpleInput } from '../forms/simple-input/simple-input';
import { FieldTree, FormField } from '@angular/forms/signals';

/**
 * Column component
 *
 * This component is a template driven composite used with the TableComponent
 * @param T object type used as datas (T[]) in the Table component
 *
 */
@Component({
  selector: 'app-column',
  templateUrl: './column.html',
  styleUrl: './column.scss',
  imports: [SimpleInput, FormField],
  host: {
    class: 'simple-column cdk-visually-hidden',
    '[attr.ariaHidden]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column<T> {
  /** Column name that should be used to reference this column.
   * By default, this will be used to access the column value as it was keyof T.
   *
   * You can extend this component behavior by projecting template yourself and adding input.
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
  /** Activate drag n drop behavior to reorder this column. Default: true
   * If set to false be aware that the element will still be able to be reordered
   * if it is not an edge of the table */
  draggable = input(true);

  /** Override header cell background color */
  styleHeaderBgColor = input<string>();
  /**
   * Cell padding css property for the non header cells.
   * Can be usefull to set to "0" if you want full control over
   * cell content display.
   * */
  cellPadding = input<string>();

  width = input<string>();

  field = input<FieldTree<SimpleValue, string>>();

  @ContentChild('cell', { static: true })
  private _cellTemplate?: TemplateRef<{ $implicit: T }>;
  @ContentChild('cellEdit', { static: true })
  private _cellEditTemplate?: TemplateRef<{ $implicit: T }>;
  @ContentChild('cellHeader', { static: true })
  private _headerTemplate?: TemplateRef<object>;

  @ViewChild('cellDefault', { static: true })
  private _defaultCellTemplate?: TemplateRef<{ $implicit: T }>;
  @ViewChild('cellEditDefault', { static: true })
  private _defaultCellEditTemplate?: TemplateRef<{ $implicit: T }>;
  @ViewChild('cellHeaderDefault', { static: true })
  private _defaultHeaderTemplate?: TemplateRef<object>;

  /**
   * Overridable getter for the header cell template.
   * This will be projected into table header if not undefined
   *
   * @return TemplateRef of the headerTemplate if present
   * */
  get headerTemplate(): TemplateRef<object> | undefined {
    return this._headerTemplate ?? this._defaultHeaderTemplate;
  }

  /**
   * Overridable getter for non header cells template.
   * This will be projected into table non header cells if not undefined
   *
   * @return TemplateRef of the cellTemplate if present
   * */
  get cellTemplate(): TemplateRef<object> | undefined {
    return this._cellTemplate ?? this._defaultCellTemplate;
  }

  /**
   * Overridable getter for non header cells template.
   * This will be projected into table non header cells if not undefined
   *
   * @return TemplateRef of the cellTemplate if present
   * */
  get cellEditTemplate(): TemplateRef<object> | undefined {
    return this._cellEditTemplate ?? this._defaultCellEditTemplate;
  }
}
