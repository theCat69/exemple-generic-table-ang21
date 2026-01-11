import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Column } from '../column/column';

@Component({
  selector: 'app-predefined-template',
  templateUrl: './predefined-template.html',
  styleUrl: './predefined-template.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: Column, useExisting: forwardRef(() => PredefinedTemplate) }],
})
export class PredefinedTemplate<T> extends Column<T> {
  @ViewChild(TemplateRef)
  predefinedTemplate!: TemplateRef<{ $implicit: T }>;

  override get cellTemplate(): TemplateRef<object> {
    return this.predefinedTemplate;
  }
}
