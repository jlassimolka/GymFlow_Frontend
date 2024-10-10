import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablemanagementComponent } from './responsablemanagement.component';

describe('ResponsablemanagementComponent', () => {
  let component: ResponsablemanagementComponent;
  let fixture: ComponentFixture<ResponsablemanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsablemanagementComponent]
    });
    fixture = TestBed.createComponent(ResponsablemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
