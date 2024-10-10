import { TestBed } from '@angular/core/testing';

import { CoachManagementService } from './coach-management.service';

describe('CoachManagementService', () => {
  let service: CoachManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
