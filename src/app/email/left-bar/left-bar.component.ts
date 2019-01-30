import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmailState } from '../../interfaces/emailState';
import * as EmailActions from '../../actions/email.action';
import { RootScopeService } from '../../services/root-scope.service';
import { ApiService } from '../../services/api.service';
import { Email } from '../../models/email.model';
import { Color } from 'src/app/interfaces/Color';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  public navList = [];
  public action: any;
  constructor(
    private store_email: Store<EmailState>,
    private api: ApiService
  ) { }

  public async ngOnInit() {
    this.navList = await this.getAllEmail('receipt');
  }

  public async newEmail(): Promise<void> {
    await this.store_email.dispatch(new EmailActions.NewEmail(true));
  }

  public async inboxEmail(): Promise<void> {
    this.navList = await this.getAllEmail('receipt');
  }

  public async sendedEmail(): Promise<void> {
    this.navList = await this.getAllEmail('send');
  }

  public async deletedEmail(): Promise<void> {
    this.navList = await this.getAllEmail('deleted');
  }

  public async getAllEmail(type: string): Promise<Email[]> {
    const responts = await this.api.getEmailsByType(type).toPromise();
    responts.map(email => {
      if (email.type === 'send') {
        email.from = email.to;
      }
      if (email.from.name != null) {
        email.color = Color[email.from.name.substr(0, 1) || email.from.email.substr(0, 1).toUpperCase()];
        email.short = email.from.name.substr(0, 1) || email.from.email.substr(0, 1);

        const char = (email.from.name.match(/ /g) || []).length;
        if (char < 2) {
          email.short += email.from.name.substr(email.from.name.indexOf(' ') + 1, 1);
        }
      }
      return email;
    });

    return responts;
  }

  public async read(item: Email): Promise<void> {
    this.navList = this.navList.filter((email) => {
      email.read = email.id === item.id || email.read ? true : false;
      return email;
    });

    const x = document.getElementsByClassName('sitebar-lists');
    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(' w3-light-grey', '');
    }
    const id = document.getElementById(item.id + '');
    id.className += ' w3-light-grey';

    await this.store_email.dispatch(new EmailActions.ReadEmail(item));
    await this.api.updateEmail(item).toPromise();
  }

  public async remove(item: Email): Promise<void> {
    const mainType = item.type;
    if (item.type === 'deleted') {
      await this.api.deleteEmail(item).toPromise();
    } else {
      item.type = 'deleted';
      await this.api.updateEmail(item).toPromise();
    }
    this.navList = await this.getAllEmail(mainType);

    this.store_email.dispatch(new EmailActions.Reset());
  }

  public async markread(item: any): Promise<void> {
    this.navList = this.navList.filter((email) => {
      email.read = email.id === item.id || email.read ? true : false;
      return email;
    });
    await this.api.updateEmail(item).toPromise();
  }

}
