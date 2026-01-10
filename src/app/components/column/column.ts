import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, inject, input, TemplateRef } from '@angular/core';
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

  @ContentChild(TemplateRef, { static: true })
  _cellTemplate!: TemplateRef<{ $implicit: T }>;

  get cellTemplate(): TemplateRef<{}> {
    return this._cellTemplate;
  }

}
