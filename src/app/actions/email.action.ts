import { Action } from '@ngrx/store';

export const NEW_EMAIL  = '[Email] New';
export const SHOW_SITEBAR = '[Email] ShowSitebar';
export const READ_EMAIL   = '[Email] Read';
export const REPLY_EMAIL = '[Email] Reply';
export const RESET      = '[Email] Reset';


export class NewEmail implements Action {
  readonly type = NEW_EMAIL;

  // use a constructor to send a payload with the action
  constructor(public payload: boolean) {}
}


export class ShowSitebar implements Action {
  readonly type = SHOW_SITEBAR;

  constructor(public payload: string) {}
}

export class ReadEmail implements Action {
  readonly type = READ_EMAIL;

  constructor(public payload: any) {}
}

export class ReplyEmail implements Action {
  readonly type = REPLY_EMAIL;

  constructor(public payload: any) {}
}

export class Reset implements Action {
  readonly type = RESET;
}


export type All = ShowSitebar | NewEmail | ReadEmail | ReplyEmail | Reset;
