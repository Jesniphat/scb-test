import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Email } from '../models/email.model';
import { EmailState } from '../interfaces/emailState';

import { RootScopeService} from '../services/root-scope.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  public email$: any;
  public siteBar$: any;

  constructor(private rootScope: RootScopeService) { }

  ngOnInit() {
    this.email$ = this.rootScope.newEmail$.subscribe(data => this.newEmail(data));
    this.siteBar$ = this.rootScope.showSiteBar$.subscribe(data => this.isShowSiteBar(data));
  }

  public newEmail(isShow: boolean): void {
    if (isShow) {
      document.getElementById('id01').style.display = 'block';
    } else {
      document.getElementById('id01').style.display = 'none';
    }
  }

  public isShowSiteBar(style: string): void {
    document.getElementById('mySidebar').style.display = style;
    document.getElementById('myOverlay').style.display = style;
  }

  public ngOnDestroy(): void {
    this.email$.unsubscribe();
  }

}
