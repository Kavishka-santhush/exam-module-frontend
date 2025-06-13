import { TestBed } from '@angular/core/testing';

import { ScheduleExamService } from './schedule-exam.service';

describe('ScheduleExamService', () => {
  let service: ScheduleExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
