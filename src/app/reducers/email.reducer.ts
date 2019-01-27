import * as EmailActions from '../actions/email.action';
import { EmailAction } from '../models/email-action.model';

export type Action = EmailActions.All;

// Set DefaultState
const defaultState: EmailAction = {
  newEmail: false,
  showSitebar: 'none',
  content: {
    id: null,
    from: {
      name: '',
      email : ''
    },
    subject: '',
    body: '',
    img: '',
    to: {
      name: '',
      email : ''
    },
    read: false,
    datetime: '',
    type: 'receipt',
    color: '',
    short: ''
  },
  reply: {
    to: '',
    subject: '',
    body: ''
  }
};

export function emailReducer(state: EmailAction = defaultState, action: Action): any {
  switch (action.type) {
    case EmailActions.NEW_EMAIL:
      return {
        ...state,
        newEmail: action.payload
      };

    case EmailActions.SHOW_SITEBAR:
      return {
        ...state,
        showSitebar: action.payload
      };

    case EmailActions.READ_EMAIL:
      return {
        ...state,
        content: action.payload
      };

    case EmailActions.REPLY_EMAIL:
      return {
      ...state,
      reply: action.payload
    };

    case EmailActions.RESET:
      return defaultState;

    default:
      return state;
  }
}
