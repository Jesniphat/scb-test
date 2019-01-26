import { Component, OnInit } from '@angular/core';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss']
})
export class NewEmailComponent implements OnInit {
  constructor(
    private rootScrop: RootScopeService
  ) { }

  ngOnInit() {
  }

  public close(): void {
    document.getElementById('id01').style.display = 'none';
    this.rootScrop.newEmailShow(false);
  }

}
