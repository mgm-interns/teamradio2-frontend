import { RegisteredUser, UnregisteredUser, UnauthorizedUser } from 'Models';
import { Observable } from 'rxjs/Observable';
import { HttpServices, LoginService } from "../HttpServices";

export class UserServices {
  private _httpServices: HttpServices;
  private _loginService: LoginService;
  private serviceUrl = 'users';

  constructor() {
    this._httpServices = new HttpServices();
    this._loginService = new LoginService();
  }

  public getCurrentUserProfile(): Observable<RegisteredUser> {
    return this._httpServices.get(`${this.serviceUrl}/me`);
  }

  public register(user: UnregisteredUser): Observable<RegisteredUser> {
    return this._httpServices.post(`${this.serviceUrl}/register`, user);
  }

  public login(user: any) {
    return this._loginService.post('oauth/token', user);
  }
}
