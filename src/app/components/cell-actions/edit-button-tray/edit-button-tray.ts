import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

// TODO make this fix width and height wise.
// TODO maybe use nice animation to transform the one button in two buttons

@Component({
  selector: 'app-edit-button-tray',
  imports: [MatButtonModule],
  templateUrl: './edit-button-tray.html',
  styleUrl: './edit-button-tray.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonTray<T> {
  elem = input.required<T>();
  activateEdit = input.required<(elem: T) => void>();
  saveEdit = input.required<(elem: T) => void>();
  cancelEdit = input.required<(elem: T) => void>();

  isInEdit = model(false);

  protected activateEditInternal(elem: T) {
    this.isInEdit.set(true);
    this.activateEdit()(elem);
  }

  protected saveEditInternal(elem: T) {
    this.isInEdit.set(false);
    this.saveEdit()(elem);
  }

  protected cancelEditInternal(elem: T) {
    this.isInEdit.set(false);
    this.cancelEdit()(elem);
  }
}
