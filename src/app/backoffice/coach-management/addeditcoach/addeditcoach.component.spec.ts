import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcoachComponent } from './addeditcoach.component';

describe('AddeditcoachComponent', () => {
  let component: AddeditcoachComponent;
  let fixture: ComponentFixture<AddeditcoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditcoachComponent]
    });
    fixture = TestBed.createComponent(AddeditcoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
