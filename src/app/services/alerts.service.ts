import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  // Observable navItem source
  // public data:any;
  public alerts$: Observable<any>;
  private _alerts: Subscriber<any>;

  constructor() {
    this.alerts$ = new Observable(observer => this._alerts = observer);
  }

  public success(messages: any) {
    if (messages && this._alerts != null) {
      this._alerts.next({type: 'success', message: messages});
    }
  }

  public info(messages: any) {
    if (messages && this._alerts != null) {
      this._alerts.next({type: 'info', message: messages});
    }
  }

  public warning(messages: any) {
    if (messages && this._alerts != null) {
      this._alerts.next({type: 'warning', message: messages});
    }
  }

  public danger(messages: any) {
    if (messages && this._alerts != null) {
      this._alerts.next({type: 'danger', message: messages});
    }
  }
}
