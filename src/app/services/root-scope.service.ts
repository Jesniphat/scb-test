import { Injectable } from '@angular/core';
import { Observable, Subscribable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootScopeService {
/**
 * var for subscripe
 */
  public newEmail$: Observable<boolean>;
  public showSiteBar$: Observable<string>;

/**
 * var for observer
 */
  public _newEmail: Subscriber<boolean>;
  public _showSiteBar: Subscriber<string>;

  constructor() {
    this.newEmail$ = new Observable(observer => this._newEmail = observer);
    this.showSiteBar$ = new Observable(observer => this._showSiteBar = observer);
  }

/**
 * Show new email dialog
 * @param isShow: boolean
 */
  public loginShow(isShow: boolean): void {
    this._newEmail.next(isShow);
  }

/**
 * Show site bar
 * @param isShow: string
 */
  public showSiteBar(isShow: string): void {
    this._showSiteBar.next(isShow);
  }
}
