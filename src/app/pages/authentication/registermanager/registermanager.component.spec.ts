import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermanagerComponent } from './registermanager.component';

describe('RegistermanagerComponent', () => {
  let component: RegistermanagerComponent;
  let fixture: ComponentFixture<RegistermanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistermanagerComponent]
    });
    fixture = TestBed.createComponent(RegistermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
