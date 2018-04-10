import { UnregisteredUser } from './UnregisteredUser';
export class RegisteredUser extends UnregisteredUser {
  public id: string;
  public firstName: string;
  public lastName: string;
  public country: string;
  public city: string;
  public bio: string;
  public avatarUrl: string;
  public coverUrl: string;
}
