import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgColumn } from './img-column';

describe('ImgColumn', () => {
  let component: ImgColumn;
  let fixture: ComponentFixture<ImgColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
