import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutFuelButtonComponent } from './out-fuel-button.component';

describe('OutFuelButtonComponent', () => {
  let component: OutFuelButtonComponent;
  let fixture: ComponentFixture<OutFuelButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutFuelButtonComponent]
    });
    fixture = TestBed.createComponent(OutFuelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
