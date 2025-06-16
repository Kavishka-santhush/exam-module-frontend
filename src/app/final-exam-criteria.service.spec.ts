import { TestBed } from '@angular/core/testing';

import { FinalExamCriteriaService } from './final-exam-criteria.service';

describe('FinalExamCriteriaService', () => {
  let service: FinalExamCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalExamCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
