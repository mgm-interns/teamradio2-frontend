import { RegisteredUser } from 'Models';

export interface IUser {
  userInfo: RegisteredUser;
  error?: string | null;
  loading?: boolean;
  isAuthenticated?: boolean;
}
