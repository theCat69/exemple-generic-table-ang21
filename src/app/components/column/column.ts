import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  imports: [MatTableModule, DragDropModule],
  template: '',
  host: {
    'class': 'simple-column cdk-visually-hidden',
    '[attr.ariaHidden]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Column<T> {
  /** Column name that should be used to reference this column. */
  prop = input.required<string>();
  label = input<string>();
  styleHeaderBgColor = input<string>('red');

  //overridable styles for columns
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
