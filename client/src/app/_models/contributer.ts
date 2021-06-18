import { User } from './user';

export interface Contributer {
  user: User;
  role: string;
  roleDetails: string;
  actor: boolean;
}
