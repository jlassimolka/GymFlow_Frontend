import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteradherantComponent } from './registeradherant.component';

describe('RegisteradherantComponent', () => {
  let component: RegisteradherantComponent;
  let fixture: ComponentFixture<RegisteradherantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteradherantComponent]
    });
    fixture = TestBed.createComponent(RegisteradherantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
