import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmailState } from '../../interfaces/emailState';
import * as EmailActions from '../../actions/email.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public emailContent$: Observable<any>;

  constructor(private store_email: Store<EmailState>) { }

  ngOnInit() {
    this.emailContent$ = this.store_email.select('email');
  }

  public openSiteBar(): void {
    this.store_email.dispatch(new EmailActions.ShowSitebar('block'));
  }

  public newEmail(): void {
    this.store_email.dispatch(new EmailActions.NewEmail(true));
  }

  public reply(to: string, subject: string, body: string): void {
    this.store_email.dispatch(new EmailActions.ReplyEmail({to: to, subject: subject, body: body }));
    this.store_email.dispatch(new EmailActions.NewEmail(true));
  }

  public forward(subject: string, body: string): void {
    this.store_email.dispatch(new EmailActions.ForwardEmail({subject: subject, body: body }));
    this.store_email.dispatch(new EmailActions.NewEmail(true));
  }
}
