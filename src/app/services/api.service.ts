import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Email } from '../models/email.model';
import { AlertsService } from './alerts.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private emailsUrl = 'api/emails';  // URL to web api

  constructor(
    private http: HttpClient,
    private alert: AlertsService
  ) { }

/**
 * GET emails from the server
 * @access public
 * @return Observable
 **/
  public getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(this.emailsUrl)
      .pipe(
        tap(_ => this.log('fetched emails')),
        catchError(this.handleError('getEmails', []))
      );
  }

/**
 * GET emails from the server
 * @access public
 * @return Observable
 **/
public getEmailsByType(type: string): Observable<Email[]> {
  const url = `${this.emailsUrl}/?type=${type}`;
  return this.http.get<Email[]>(url)
    .pipe(
      tap(_ => this.log('fetched emails')),
      catchError(this.handleError('getEmails', []))
    );
}

/**
 * GET email by id. Return `undefined` when id not found
 * @param id: number
 * @access public
 * @return Observable<Email>
 **/
  public getEmailNo404<Data>(id: number): Observable<Email> {
    const url = `${this.emailsUrl}/?id=${id}`;
    return this.http.get<Email[]>(url)
      .pipe(
        map(emails => emails[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} email id=${id}`);
        }),
        catchError(this.handleError<Email>(`getEmail id=${id}`))
      );
  }


/**
 * GET email by id. Will 404 if id not found
 * @param id: number
 * @access public
 * @return Observable<Email>
 **/
public getEmail(id: number): Observable<Email> {
    const url = `${this.emailsUrl}/${id}`;
    return this.http.get<Email>(url).pipe(
      tap(_ => this.log(`fetched email id=${id}`)),
      catchError(this.handleError<Email>(`getEmail id=${id}`))
    );
  }


/**
 * GET emails whose name contains search term
 * @param term: string
 * @access public
 * @return Observable<Email[]>
 **/
  public searchEmails(term: string): Observable<Email[]> {
    if (!term.trim()) {
      // if not search term, return empty email array.
      return of([]);
    }
    return this.http.get<Email[]>(`${this.emailsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found emails matching "${term}"`)),
      catchError(this.handleError<Email[]>('searchEmails', []))
    );
  }

//////// Save methods //////////

/**
 * POST: add a new email to the server
 * @param email: Email
 * @access public
 * @return Observable<Email>
 **/
  public addEmail (email: Email): Observable<Email> {
    return this.http.post<Email>(this.emailsUrl, email, httpOptions).pipe(
      tap((new_email: Email) => this.log(`added email w/ id=${new_email.id}`)),
      catchError(this.handleError<Email>('addEmail'))
    );
  }

/**
 * DELETE: delete the email from the server
 * @param email: Email
 * @access public
 * @return Observable<Email>
 **/
  public deleteEmail (email: Email | number): Observable<Email> {
    const id = typeof email === 'number' ? email : email.id;
    const url = `${this.emailsUrl}/${id}`;

    return this.http.delete<Email>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted email id=${id}`)),
      catchError(this.handleError<Email>('deleteEmail'))
    );
  }

/**
 * PUT: update the email on the server
 **/
  public updateEmail (email: Email): Observable<any> {
    return this.http.put(this.emailsUrl, email, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${email.id}`)),
      catchError(this.handleError<any>('updateEmail'))
    );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 * @access public
 * @return Observable<T>
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // alert error
      this.alert.danger(error.message);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

/**
 * Log a EmailService message with the MessageService
 * @param message: string
 * @access private
 * @return void
 **/
  private log(message: string): void {
    console.log(`EmailService: ${message}`);
  }
}
