import { Component, OnInit } from '@angular/core';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private rootScope: RootScopeService) { }

  ngOnInit() {
  }

  public openSiteBar(): void {
    this.rootScope.showSiteBar('block');
  }

  public newEmail(): void {
    this.rootScope.newEmailShow(true);
  }
}
