import { Email } from './email.model';

export interface EmailAction {
    newEmail: boolean;
    showSitebar: string;
    content?: Email;
    reply: {
        to: string;
        subject: string;
        body: string;
    };
    forward: {
        subject: string;
        body: string;
    };
}
