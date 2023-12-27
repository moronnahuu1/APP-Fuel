import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelRegisterComponent } from './fuel-register.component';

describe('FuelRegisterComponent', () => {
  let component: FuelRegisterComponent;
  let fixture: ComponentFixture<FuelRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelRegisterComponent]
    });
    fixture = TestBed.createComponent(FuelRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
