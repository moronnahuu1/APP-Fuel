import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOperationsComponent } from './saved-operations.component';

describe('SavedOperationsComponent', () => {
  let component: SavedOperationsComponent;
  let fixture: ComponentFixture<SavedOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedOperationsComponent]
    });
    fixture = TestBed.createComponent(SavedOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
