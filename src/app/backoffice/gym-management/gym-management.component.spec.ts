import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymManagementComponent } from './gym-management.component';

describe('GymManagementComponent', () => {
  let component: GymManagementComponent;
  let fixture: ComponentFixture<GymManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GymManagementComponent]
    });
    fixture = TestBed.createComponent(GymManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
