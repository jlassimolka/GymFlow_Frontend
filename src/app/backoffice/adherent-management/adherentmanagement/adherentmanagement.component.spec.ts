import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherentmanagementComponent } from './adherentmanagement.component';

describe('AdherentmanagementComponent', () => {
  let component: AdherentmanagementComponent;
  let fixture: ComponentFixture<AdherentmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdherentmanagementComponent]
    });
    fixture = TestBed.createComponent(AdherentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
