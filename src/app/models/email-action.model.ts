import { Email } from './email.model';

export interface EmailAction {
    newEmail: boolean;
    showSitebar: string;
    content?: Email;
    reply: any;
}
