import { TestBed } from '@angular/core/testing';

import { PlanbackendFakeServiceTsService } from './planbackend.fake.service.ts.service';

describe('PlanbackendFakeServiceTsService', () => {
  let service: PlanbackendFakeServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanbackendFakeServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
