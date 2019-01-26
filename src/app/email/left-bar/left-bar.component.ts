import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmailState } from '../../interfaces/emailState';
import * as EmailActions from '../../actions/email.action';
import { RootScopeService } from '../../services/root-scope.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  public navList = [];

  constructor(private rootScope: RootScopeService) { }

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.navList.push({
        a: 'A', link: 'B', i: i
      });
    }
  }

  public newEmail(): void {
    this.rootScope.newEmailShow(true);
  }

}
