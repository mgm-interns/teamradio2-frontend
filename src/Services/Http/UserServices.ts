import { Observable } from "rxjs/Observable";
import { HttpServices } from "./HttpServices";

export class UserServices {
  private _httpServices: HttpServices;

  constructor() {
    this._httpServices = new HttpServices();
  }

  public getUserProfile(userId: string): Observable<any> {
    return this._httpServices.get('profile/' + userId);
  }
}
