import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InFuelButtonComponent } from './in-fuel-button.component';

describe('InFuelButtonComponent', () => {
  let component: InFuelButtonComponent;
  let fixture: ComponentFixture<InFuelButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InFuelButtonComponent]
    });
    fixture = TestBed.createComponent(InFuelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
