import { RegisteredUser } from "Models/User";

export interface IUser {
  userInfo: RegisteredUser;
  error?: string | null;
  loading?: boolean,
  isAuthenticated?: boolean,
}

