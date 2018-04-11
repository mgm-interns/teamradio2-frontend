import {
  AccessToken,
  RegisteredUser,
  UnauthorizedUser,
  UnregisteredUser,
} from 'Models';
import { Observable } from 'rxjs/Observable';
import { HttpServices, OAuthService } from '../HttpServices';

export class UserServices {
  private _httpServices: HttpServices;
  private _oAuthService: OAuthService;
  private serviceUrl = 'users';

  constructor() {
    this._httpServices = new HttpServices();
    this._oAuthService = new OAuthService();
  }

  public getCurrentUserProfile(): Observable<RegisteredUser> {
    return this._httpServices.get(`${this.serviceUrl}/me`);
  }

  public register(user: UnregisteredUser): Observable<RegisteredUser> {
    return this._httpServices.post(`${this.serviceUrl}/register`, user);
  }

  public login(user: UnauthorizedUser): Observable<AccessToken> {
    return this._oAuthService.authorize(user);
  }
}
