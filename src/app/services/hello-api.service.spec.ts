import { TestBed } from '@angular/core/testing';

import { HelloApiService } from './hello-api.service';

describe('HelloApiService', () => {
  let service: HelloApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelloApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
