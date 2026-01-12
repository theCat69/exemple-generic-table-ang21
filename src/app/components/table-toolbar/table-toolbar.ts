import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-toolbar',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableToolbar {

  @ContentChild(TemplateRef, { static: true })
  private _toolbarTemplate?: TemplateRef<object>;

  get toolbarTemplate(): TemplateRef<object> | undefined {
    return this._toolbarTemplate;
  };

}
