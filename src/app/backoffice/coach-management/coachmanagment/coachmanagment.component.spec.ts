import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachmanagmentComponent } from './coachmanagment.component';

describe('CoachmanagmentComponent', () => {
  let component: CoachmanagmentComponent;
  let fixture: ComponentFixture<CoachmanagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachmanagmentComponent]
    });
    fixture = TestBed.createComponent(CoachmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
