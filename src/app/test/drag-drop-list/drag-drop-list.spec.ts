import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropList } from './drag-drop-list';

describe('DragDropList', () => {
  let component: DragDropList;
  let fixture: ComponentFixture<DragDropList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
