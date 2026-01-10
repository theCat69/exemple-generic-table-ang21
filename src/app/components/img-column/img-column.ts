import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { Column } from '../column/column';
import { MatTableModule } from '@angular/material/table';
import { NgTemplateOutlet } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-img-column',
  imports: [MatTableModule, NgTemplateOutlet, DragDropModule],
  templateUrl: './img-column.html',
  styleUrl: './img-column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: Column, useExisting: forwardRef(() => ImgColumn) }],
})
export class ImgColumn<T> extends Column<T> {

}
