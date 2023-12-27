import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFuelComponent } from './total-fuel.component';

describe('TotalFuelComponent', () => {
  let component: TotalFuelComponent;
  let fixture: ComponentFixture<TotalFuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalFuelComponent]
    });
    fixture = TestBed.createComponent(TotalFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
