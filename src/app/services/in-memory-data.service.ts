import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Email } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const emails = [
      {
        id: 1,
        from : {
          name : 'Now TV',
          email : 'nowtv@test.com'
        },
        subject : 'Grab another Pass, you need to be watching...',
        body : 'Oscar winners Sir Anthony Hopkins and Ed Harris join an impressive cast boasting '
        + 'the likes of Thandie Newton, James Marsden and Jeffrey Wright.',
        read: false,
        datetime: 'Jan 27, 2019',
        type: 'receipt'
      },
      {
        id: 2,
        from : {
          name : 'Investopedia Terms',
          email : 'investopedia@test.com'
        },
        subject : 'What is \'Fibonanci Retracement\'?',
        body : 'Fibonacci retracement is a term used in technical analysis that refers to areas of '
        + 'support (price stops going lower) or resistance (price stops going higher).',
        datetime: 'Jan 27, 2019',
        read: false,
        type: 'receipt'
      },
      {
        id: 3,
        from : {
          name : 'ASICS Greater Manchester Marathon ',
          email : 'events@human-race.co.uk'
        },
        subject : 'Your chance to take on the marathon',
        body : 'Do you feel inspired to take on one of Europe\'s most highly regarded and popular marathons?',
        datetime: 'Jan 27, 2019',
        read: false,
        type: 'receipt'
      },
      {
        id: 4,
        from : {
          name : 'Google',
          email : 'events@human-race.co.uk'
        },
        subject : 'Security alert',
        body : 'New device signied in to my_email@myemail.com?',
        read: false,
        datetime: 'Jan 25, 2019',
        type: 'receipt',
        img: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png'
      }
    ];
    return {emails};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the emails array is empty,
  // the method below returns the initial number (11).
  // if the emails array is not empty, the method below returns the highest
  // email id + 1.
  genId(emails: Email[]): number {
    return emails.length > 0 ? Math.max(...emails.map(email => email.id)) + 1 : 1;
  }
}
