import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInput } from './simple-input';

describe('SimpleInput', () => {
  let component: SimpleInput;
  let fixture: ComponentFixture<SimpleInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
