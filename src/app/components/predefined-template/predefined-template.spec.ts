import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedTemplate } from './predefined-template';

describe('PredefinedTemplate', () => {
  let component: PredefinedTemplate;
  let fixture: ComponentFixture<PredefinedTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinedTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
