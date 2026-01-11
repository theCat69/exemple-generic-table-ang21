import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonTray } from './edit-button-tray';

describe('EditButtonTray', () => {
  let component: EditButtonTray;
  let fixture: ComponentFixture<EditButtonTray>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditButtonTray],
    }).compileComponents();

    fixture = TestBed.createComponent(EditButtonTray);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
