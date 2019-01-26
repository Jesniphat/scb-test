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

  public w3_open(): void {
    document.getElementById('mySidebar').style.display = 'block';
    document.getElementById('myOverlay').style.display = 'block';
  }

  public openSiteBar(): void {
    this.rootScope.showSiteBar('block');
  }

}
