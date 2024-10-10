import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditgymComponent } from './addeditgym.component';

describe('AddeditgymComponent', () => {
  let component: AddeditgymComponent;
  let fixture: ComponentFixture<AddeditgymComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditgymComponent]
    });
    fixture = TestBed.createComponent(AddeditgymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
