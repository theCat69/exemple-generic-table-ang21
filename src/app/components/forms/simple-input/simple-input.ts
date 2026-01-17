import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-simple-input',
  imports: [],
  templateUrl: './simple-input.html',
  styleUrl: './simple-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleInput implements FormValueControl<string> {
  value = model<string>('');

}
