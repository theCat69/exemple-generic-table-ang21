import { TestBed } from '@angular/core/testing';

import { TableInlineSort } from './table-inline-sort';

describe('TableInlineSort', () => {
  let service: TableInlineSort;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableInlineSort);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
