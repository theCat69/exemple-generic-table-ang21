import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop-list',
  imports: [DragDropModule],
  templateUrl: './drag-drop-list.html',
  styleUrl: './drag-drop-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDropList {
  timePeriods = ['Bronze age', 'Iron age', 'Middle ages', 'Early modern period', 'Long nineteenth century',]; drop(event: CdkDragDrop<string[]>) { moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex); }
}
