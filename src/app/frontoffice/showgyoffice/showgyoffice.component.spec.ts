import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgyofficeComponent } from './showgyoffice.component';

describe('ShowgyofficeComponent', () => {
  let component: ShowgyofficeComponent;
  let fixture: ComponentFixture<ShowgyofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowgyofficeComponent]
    });
    fixture = TestBed.createComponent(ShowgyofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
