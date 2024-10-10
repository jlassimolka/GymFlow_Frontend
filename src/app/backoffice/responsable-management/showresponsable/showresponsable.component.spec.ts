import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowresponsableComponent } from './showresponsable.component';

describe('ShowresponsableComponent', () => {
  let component: ShowresponsableComponent;
  let fixture: ComponentFixture<ShowresponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowresponsableComponent]
    });
    fixture = TestBed.createComponent(ShowresponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
