import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmailComponent } from './new-email.component';
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../../reducers/email.reducer';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('NewEmailComponent', () => {
  let component: NewEmailComponent;
  let fixture: ComponentFixture<NewEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmailComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({
          email: emailReducer, /// <--- add reducer here
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
