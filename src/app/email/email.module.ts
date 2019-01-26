import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { ContentComponent } from './content/content.component';
import { NewEmailComponent } from './new-email/new-email.component';
import { EmailComponent } from './email.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../reducers/email.reducer';

@NgModule({
  declarations: [LeftBarComponent, ContentComponent, NewEmailComponent, EmailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    StoreModule.forRoot({
      post: emailReducer, /// <--- add reducer here
    })
  ]
})
export class EmailModule { }
