import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {
  public navList = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.navList.push({
        a: 'A', link: 'B', i: i
      });
    }
  }

}
