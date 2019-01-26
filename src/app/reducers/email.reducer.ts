import * as EmailActions from '../actions/email.action';
import { Email } from '../models/email.model';

export type Action = EmailActions.All;

// Set DefaultState
const defaultState: Email = {
  new: false
};

export function emailReducer(state: Email = defaultState, action: Action): any {
  console.log(action);
  switch (action.type) {
    case EmailActions.NEW_EMAIL:
      return {
        ...state,
        text: action.payload
      };

    default:
      return state;
  }
}
