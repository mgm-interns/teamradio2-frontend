import { UnregisteredUser } from './UnregisteredUser';
export class RegisteredUser extends UnregisteredUser {
  public id: string;
  public name: string;
  public email: string;
  public firstName?: string;
  public lastName?: string;
  public country?: string;
  public city?: string;
  public bio?: string;
  public avatarUrl?: string;
  public coverUrl?: string;
  public reputation: number;
  public songs?: number;
  public voted?: number;
}
