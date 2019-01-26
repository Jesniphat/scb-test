import { Action } from '@ngrx/store';

export const NEW_EMAIL  = '[Post] New';
export const UPVOTE     = '[Post] Upvote';
export const DOWNVOTE   = '[Post] Downvote';
export const RESET      = '[Post] Reset';


export class NewEmail implements Action {
  readonly type = NEW_EMAIL;

  // use a constructor to send a payload with the action
  constructor(public payload: boolean) {}
}


export class Upvote implements Action {
  readonly type = UPVOTE;
}

export class Downvote implements Action {
  readonly type = DOWNVOTE;
}

export class Reset implements Action {
  readonly type = RESET;
}

export type All = Upvote | Downvote | Reset | NewEmail;
