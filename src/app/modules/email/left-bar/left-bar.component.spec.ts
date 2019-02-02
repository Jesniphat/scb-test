import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { LeftBarComponent } from './left-bar.component';
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../../../reducers/email.reducer';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../../services/api.service';

describe('LeftBarComponent', () => {
  let component: LeftBarComponent;
  let fixture: ComponentFixture<LeftBarComponent>;

  const mockApiService = jasmine.createSpyObj('ApiService', ['getEmailsByType']);

  const mockApi = [
    {
      id: 1,
        from : {
          name : 'Jese Test',
          email : 'test@test.com'
        },
        subject : 'test',
        body : 'test',
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
        FormsModule,
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
    // const mockApiPromise = new Promise((resolve, reject) => { resolve(mockApi); });
    const mockApiPromise: Observable<any> = of(mockApi);
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
    console.log(component.navList);
    expect(component.navList.length).toBe(1);
  });

});
