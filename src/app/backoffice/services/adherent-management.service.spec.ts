import { TestBed } from '@angular/core/testing';

import { AdherentManagementService } from './adherent-management.service';

describe('AdherentManagementService', () => {
  let service: AdherentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
