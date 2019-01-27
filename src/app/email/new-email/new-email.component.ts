import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmailState } from '../../interfaces/emailState';
import * as EmailActions from '../../actions/email.action';
import { Email } from '../../models/email.model';
import { ApiService } from '../../services/api.service';
import { AlertsService } from '../../services/alerts.service';

import * as moment from 'moment';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss']
})
export class NewEmailComponent implements OnInit, OnDestroy {
  public sending: Email = {
    to: {
      name: '',
      email: ''
    },
    subject: '',
    body: '',
    img: '',
    read: true,
    datetime: Date.now().toString(),
    type: 'send'
  };

  public email$: any;
  private reply = false;
  private forward = false;

  constructor(
    private store_email: Store<EmailState>,
    private api: ApiService,
    private alert: AlertsService
  ) {
    const that = this;
    this.email$ = this.store_email.select('email').subscribe(data => {
      if (data.reply.to && data.reply.subject && data.reply.body) {
        this.sending.to.email = data.reply.to;
        this.sending.subject = data.reply.subject;
        this.sending.body = data.reply.body;
        that.reply = true;
      } else if (data.forward.subject && data.forward.body) {
        this.sending.to.email = '';
        this.sending.subject = data.forward.subject;
        this.sending.body = data.forward.body;
        that.forward = true;
      } else {
        this.sending.to.email = '';
        this.sending.subject = '';
        this.sending.body = '';
      }
    });
  }

  ngOnInit() {
  }

  public async close(): Promise<void> {
    this.store_email.dispatch(new EmailActions.NewEmail(false));
    if (this.reply) {
      this.store_email.dispatch(new EmailActions.ReplyEmail({to: '', subject: '', body: ''}));
      this.reply = false;
    }

    if (this.forward) {
      this.store_email.dispatch(new EmailActions.ForwardEmail({subject: '', body: ''}));
      this.forward = false;
    }
  }

  public async sendEmail(): Promise<void> {
    this.sending.datetime = moment().format('ll');
    await this.api.addEmail(this.sending).toPromise();
    await this.close();
    await this.reset();
    await this.alert.success('Email sent.');
  }

  private async reset(): Promise<void> {
    this.sending = {
      to: {
        name: '',
        email: ''
      },
      subject: '',
      body: '',
      img: '',
      read: true,
      datetime: Date.now().toString(),
      type: 'send'
    };
  }

  public ngOnDestroy() {
    this.email$.unsubscribe();
  }

}
