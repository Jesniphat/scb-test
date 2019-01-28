import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmailRoutingModule } from './email-routing.module';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { ContentComponent } from './content/content.component';
import { NewEmailComponent } from './new-email/new-email.component';
import { EmailComponent } from './email.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { emailReducer } from '../reducers/email.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [LeftBarComponent, ContentComponent, NewEmailComponent, EmailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      email: emailReducer, /// <--- add reducer here
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class EmailModule { }
