import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertsService } from './alerts.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      AlertsService
    ]
  }));

  it('should be created', () => {
    const alertService: AlertsService = TestBed.get(AlertsService);
    spyOn(alertService, 'alerts$');
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
