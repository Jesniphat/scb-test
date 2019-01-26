import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss']
})
export class NewEmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public close(): void {
    document.getElementById('id01').style.display = 'none';
  }

}
