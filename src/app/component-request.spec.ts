import { TestBed } from '@angular/core/testing';

import { ComponentRequest } from './component-request';

describe('ComponentRequest', () => {
  let service: ComponentRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
