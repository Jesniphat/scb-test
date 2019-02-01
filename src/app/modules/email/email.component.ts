import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EmailState } from '../../interfaces/emailState';
import * as EmailActions from '../../actions/email.action';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  public email$: Observable<any>;

  constructor(
    private store_email: Store<EmailState>
    ) {
      this.email$ = this.store_email.select('email');
    }

  ngOnInit() { }

  public isShowSiteBar(style: string): void {
    this.store_email.dispatch(new EmailActions.ShowSitebar(style));
  }

  public ngOnDestroy(): void { }

}
