import { RegisteredUser, UnregisteredUser } from 'Models';
import { Observable } from 'rxjs/Observable';
import { HttpServices } from '../HttpServices/index';

export class UserServices {
  private _httpServices: HttpServices;
  private serviceUrl = 'users';

  constructor() {
    this._httpServices = new HttpServices();
  }

  public getCurrentUserProfile(): Observable<RegisteredUser> {
    return this._httpServices.get(`${this.serviceUrl}/me`);
  }

  public register(user: UnregisteredUser): Observable<RegisteredUser> {
    return this._httpServices.post(`${this.serviceUrl}/register`, user);
  }
}
