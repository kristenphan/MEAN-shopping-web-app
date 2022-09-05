import { TestBed } from '@angular/core/testing';

import { NotiferService } from './notifer.service';

describe('NotiferService', () => {
  let service: NotiferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotiferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
