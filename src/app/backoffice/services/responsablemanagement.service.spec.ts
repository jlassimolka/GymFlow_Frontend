import { TestBed } from '@angular/core/testing';

import { ResponsablemanagementService } from './responsablemanagement.service';

describe('ResponsablemanagementService', () => {
  let service: ResponsablemanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsablemanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
