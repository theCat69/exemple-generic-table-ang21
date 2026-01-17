import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { isWithRowMetadata } from '../../../types/table-types';

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
  activateEdit = output<T>();
  saveEdit = output<T>();
  cancelEdit = output<T>();

  isInEdit = signal(false);

  isModified = computed(() => {
    const elem = this.elem();
    if (isWithRowMetadata(elem)) {
      return elem.modified;
    }
    return false;
  })

  protected activateEditInternal(elem: T) {
    this.isInEdit.set(true);
    this.activateEdit.emit(elem);
  }

  protected saveEditInternal(elem: T) {
    this.isInEdit.set(false);
    this.saveEdit.emit(elem);
  }

  protected cancelEditInternal(elem: T) {
    this.isInEdit.set(false);
    this.cancelEdit.emit(elem);
  }
}
