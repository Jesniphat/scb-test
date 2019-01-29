import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarComponent } from './left-bar.component';
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../../reducers/email.reducer';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../services/api.service';

describe('LeftBarComponent', () => {
  let component: LeftBarComponent;
  let fixture: ComponentFixture<LeftBarComponent>;

  const mockApiService = jasmine.createSpyObj('ApiService', ['getEmailsByType']);

  const mockApi = [
    {
      id: 1,
      from : {
        name : 'Now TV',
        email : 'nowtv@test.com'
      },
      subject : 'Grab another Pass, you need to be watching...',
      body : 'Oscar winners Sir Anthony Hopkins and Ed Harris join an impressive cast boasting '
      + 'the likes of Thandie Newton, James Marsden and Jeffrey Wright.',
      read: false,
      datetime: 'Jan 27, 2019',
      type: 'receipt'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftBarComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          email: emailReducer
        })
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    })
    .compileComponents();

    const ApiServiceSpyObj = TestBed.get(ApiService);
    const mockApiPromise = new Promise((resolve, reject) => { resolve(mockApi); });
    ApiServiceSpyObj.getEmailsByType.and.returnValue(mockApiPromise);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data list', async () => {
    const result = await component.inboxEmail();
    expect(component.navList.length).toBe(1);
  });

});
