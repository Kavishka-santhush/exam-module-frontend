import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalExamCriteriaComponent } from './final-exam-criteria.component';

describe('FinalExamCriteriaComponent', () => {
  let component: FinalExamCriteriaComponent;
  let fixture: ComponentFixture<FinalExamCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalExamCriteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalExamCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
