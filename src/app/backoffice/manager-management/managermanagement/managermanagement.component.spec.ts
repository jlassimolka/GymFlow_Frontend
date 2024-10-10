import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagermanagementComponent } from './managermanagement.component';

describe('ManagermanagementComponent', () => {
  let component: ManagermanagementComponent;
  let fixture: ComponentFixture<ManagermanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagermanagementComponent]
    });
    fixture = TestBed.createComponent(ManagermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
