import { ChangeDetectionStrategy, Component, computed, effect, input, model } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-simple-input',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './simple-input.html',
  styleUrl: './simple-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleInput implements FormValueControl<string> {
  value = model<string>('');

  label = input<string>();
  placeholder = input<string>();

  //Signal forms validations :
  // Writable interaction state - control updates these
  touched = model<boolean>(false);
  // Read-only state - form system manages these
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalField<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalField<ValidationError.WithField>[]>([]);

  constructor() {
    effect(() => {
      const touched = this.touched();
      console.log('touched', touched);
    });
    effect(() => {
      const required = this.required();
      console.log('required', required);
    });
    effect(() => {
      const errors = this.errors();
      console.log('errors', errors);
    });
    effect(() => {
      const invalid = this.invalid();
      console.log('invalid', invalid);
    });
  }
}
