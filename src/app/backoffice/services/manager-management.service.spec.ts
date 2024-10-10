import { TestBed } from '@angular/core/testing';

import { ManagerManagementService } from './manager-management.service';

describe('ManagerManagementService', () => {
  let service: ManagerManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
