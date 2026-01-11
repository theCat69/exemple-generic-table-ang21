import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  inject,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-column',
  template: '',
  host: {
    class: 'simple-column cdk-visually-hidden',
    '[attr.ariaHidden]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column<T, V> {
  /** Column name that should be used to reference this column. */
  prop = input.required<string>();
  label = input<string>();
  valueAccessor = input<(elem: T) => V>();

  //overridable styles for columns
  styleHeaderBgColor = input<string>();
  cellPadding = input<string>();

  changeDetectorRef = inject(ChangeDetectorRef);

  @ContentChild('cell', { static: true })
  private _cellTemplate?: TemplateRef<{ $implicit: T }>;
  @ContentChild('header', { static: true })
  private _headerTemplate?: TemplateRef<{}>;

  get headerTemplate(): TemplateRef<any> | undefined {
    return this._headerTemplate;
  }

  get cellTemplate(): TemplateRef<any> | undefined {
    return this._cellTemplate;
  }
}
