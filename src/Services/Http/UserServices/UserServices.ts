import {
  AccessToken,
  EmailForm,
  FavoriteSong,
  PasswordForm,
  RegisteredUser,
  Station,
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

  public getListMyStation(): Observable<Station[]> {
    return this._httpServices.get('users/me/stations');
  }

  public getListCurrentStation(): Observable<Station[]> {
    return this._httpServices.get('user/me/recent-station');
  }

  public register(user: UnregisteredUser): Observable<RegisteredUser> {
    return this._httpServices.post(`${this.serviceUrl}/register`, user);
  }

  public login(user: UnauthorizedUser): Observable<AccessToken> {
    return this._oAuthService.authorize(user);
  }

  public loginWithFacebook(fbAccessToken: string): Observable<AccessToken> {
    return this._oAuthService.loginWithFacebook(fbAccessToken);
  }

  public loginWithGoogle(googleAccessToken: string): Observable<AccessToken> {
    return this._oAuthService.loginWithGoogle(googleAccessToken);
  }

  public updateUserInfo(user: RegisteredUser): Observable<any> {
    return this._httpServices.patch(`${this.serviceUrl}/me`, user);
  }

  public uploadUserAvatar(userAvatar: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', userAvatar);
    return this._httpServices.patch(`${this.serviceUrl}/me/avatar`, formData);
  }

  public uploadUserCover(userAvatar: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', userAvatar);
    return this._httpServices.patch(`${this.serviceUrl}/me/cover`, formData);
  }

  public getListFavorite(): Observable<FavoriteSong[]> {
    return this._httpServices.get(this.serviceUrl + '/me/favorites');
  }

  public addSongToFavorite(songId: string): Observable<FavoriteSong> {
    const params: any = {
      songId,
    };
    return this._httpServices.post(this.serviceUrl + '/me/favorites', params);
  }

  public removeFavorite(songId: string): Observable<{}> {
    return this._httpServices.delete(
      `${this.serviceUrl}/me/favorites/${songId}`,
    );
  }

  public changePassword(passwordForm: PasswordForm): Observable<any> {
    return this._httpServices.patch(
      `${this.serviceUrl}/me/password`,
      passwordForm,
    );
  }

  public forgotPassword(emailForm: EmailForm): Observable<any> {
    return this._httpServices.post(
      `${this.serviceUrl}/forgot-password`,
      emailForm,
    );
  }
}
