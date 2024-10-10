import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcoachComponent } from './detailcoach.component';

describe('DetailcoachComponent', () => {
  let component: DetailcoachComponent;
  let fixture: ComponentFixture<DetailcoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailcoachComponent]
    });
    fixture = TestBed.createComponent(DetailcoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
