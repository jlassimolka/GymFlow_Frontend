import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgymComponent } from './showgym.component';

describe('ShowgymComponent', () => {
  let component: ShowgymComponent;
  let fixture: ComponentFixture<ShowgymComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowgymComponent]
    });
    fixture = TestBed.createComponent(ShowgymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
