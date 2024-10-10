import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdherentComponent } from './show-adherent.component';

describe('ShowAdherentComponent', () => {
  let component: ShowAdherentComponent;
  let fixture: ComponentFixture<ShowAdherentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAdherentComponent]
    });
    fixture = TestBed.createComponent(ShowAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
