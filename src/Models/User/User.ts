export class User {
  public id: string;
  public email: string;
  public username: string;
  public password: string;
  public name: string;
  public firstName: string;
  public lastName: string;
  public country: string;
  public city: string;
  public bio: string;
  public avatarUrl: string;
  public coverUrl: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
