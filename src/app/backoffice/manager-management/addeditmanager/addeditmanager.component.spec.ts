import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditmanagerComponent } from './addeditmanager.component';

describe('AddeditmanagerComponent', () => {
  let component: AddeditmanagerComponent;
  let fixture: ComponentFixture<AddeditmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditmanagerComponent]
    });
    fixture = TestBed.createComponent(AddeditmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
