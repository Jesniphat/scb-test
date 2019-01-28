import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComponent } from './email.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../reducers/email.reducer';
import { RootScopeService } from '../services/root-scope.service';
import { AlertsService } from '../services/alerts.service';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        StoreModule.forRoot({
          email: emailReducer, /// <--- add reducer here
        })
      ],
      providers: [
        AlertsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const alerts: AlertsService = TestBed.get(AlertsService);
    spyOn(alerts, 'alerts$');

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
