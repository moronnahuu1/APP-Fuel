import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsHistoryComponent } from './movements-history.component';

describe('MovementsHistoryComponent', () => {
  let component: MovementsHistoryComponent;
  let fixture: ComponentFixture<MovementsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovementsHistoryComponent]
    });
    fixture = TestBed.createComponent(MovementsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
