import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmanagerComponent } from './showmanager.component';

describe('ShowmanagerComponent', () => {
  let component: ShowmanagerComponent;
  let fixture: ComponentFixture<ShowmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowmanagerComponent]
    });
    fixture = TestBed.createComponent(ShowmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
