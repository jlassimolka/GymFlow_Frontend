import { TestBed } from '@angular/core/testing';

import { GymManagementService } from './gym-management.service';

describe('GymManagementService', () => {
  let service: GymManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
