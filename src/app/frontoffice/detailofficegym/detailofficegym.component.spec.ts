import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailofficegymComponent } from './detailofficegym.component';

describe('DetailofficegymComponent', () => {
  let component: DetailofficegymComponent;
  let fixture: ComponentFixture<DetailofficegymComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailofficegymComponent]
    });
    fixture = TestBed.createComponent(DetailofficegymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
