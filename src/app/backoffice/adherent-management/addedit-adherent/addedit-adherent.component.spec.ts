import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditAdherentComponent } from './addedit-adherent.component';

describe('AddeditAdherentComponent', () => {
  let component: AddeditAdherentComponent;
  let fixture: ComponentFixture<AddeditAdherentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditAdherentComponent]
    });
    fixture = TestBed.createComponent(AddeditAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
