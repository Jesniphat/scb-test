import { TestBed } from '@angular/core/testing';

import { RootScopeService } from './root-scope.service';

describe('RootScopeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootScopeService = TestBed.get(RootScopeService);
    expect(service).toBeTruthy();
  });
});
