import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditresponsableComponent } from './addeditresponsable.component';

describe('AddeditresponsableComponent', () => {
  let component: AddeditresponsableComponent;
  let fixture: ComponentFixture<AddeditresponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditresponsableComponent]
    });
    fixture = TestBed.createComponent(AddeditresponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
