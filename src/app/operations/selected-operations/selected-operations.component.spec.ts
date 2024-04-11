import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOperationsComponent } from './selected-operations.component';

describe('SelectedOperationsComponent', () => {
  let component: SelectedOperationsComponent;
  let fixture: ComponentFixture<SelectedOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedOperationsComponent]
    });
    fixture = TestBed.createComponent(SelectedOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
