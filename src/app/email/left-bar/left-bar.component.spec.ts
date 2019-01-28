import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarComponent } from './left-bar.component';
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../../reducers/email.reducer';
import { HttpClientModule } from '@angular/common/http';

describe('LeftBarComponent', () => {
  let component: LeftBarComponent;
  let fixture: ComponentFixture<LeftBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftBarComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          email: emailReducer
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navList have data', async () => {
    await expect(component.navList.length).toBe(0);
    await spyOn(component, 'getAllEmail').and.returnValue([
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
      },
      {
        id: 2,
        from : {
          name : 'Investopedia Terms',
          email : 'investopedia@test.com'
        },
        subject : 'What is \'Fibonanci Retracement\'?',
        body : 'Fibonacci retracement is a term used in technical analysis that refers to areas of '
        + 'support (price stops going lower) or resistance (price stops going higher).',
        datetime: 'Jan 27, 2019',
        read: false,
        type: 'receipt'
      }
    ]);
    await component.inboxEmail();
    await expect(component.navList.length).toBe(2);
  });

});
