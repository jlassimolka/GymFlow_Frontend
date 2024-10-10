import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcoachComponent } from './showcoach.component';

describe('ShowcoachComponent', () => {
  let component: ShowcoachComponent;
  let fixture: ComponentFixture<ShowcoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcoachComponent]
    });
    fixture = TestBed.createComponent(ShowcoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
