export interface Email {
  id?: number;
  from?: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
  img?: string;
  to?: {
    name: string;
    email: string;
  };
  read?: boolean;
  datetime: string;
  type: string;
  color?: string;
  short?: string;
}
