import { Service } from 'Configuration/DependencyInjection';
import {
  AccessToken,
  EmailForm,
  FavoriteSong,
  PasswordForm,
  RegisteredUser,
  StationItem,
  UnauthorizedUser,
  UnregisteredUser,
} from 'Models';
import { Observable } from 'rxjs/Observable';
import { HttpServices, OAuthService } from '../HttpServices';

@Service('UserServices')
export class UserServices {
  private _httpServices: HttpServices;
  private _oAuthService: OAuthService;
  private serviceUrl = 'users';
  private currentUserServiceUrl = `${this.serviceUrl}/me`;

  constructor() {
    this._httpServices = new HttpServices();
    this._oAuthService = new OAuthService();
  }

  public getCurrentUserProfile(): Observable<RegisteredUser> {
    return this._httpServices.get(this.currentUserServiceUrl);
  }

  public getListMyStation(): Observable<StationItem[]> {
    return this._httpServices.get(`${this.currentUserServiceUrl}/stations`);
  }

  public getListMyRecentStation(): Observable<StationItem[]> {
    return this._httpServices.get(`${this.currentUserServiceUrl}/recent-station`);
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
    return this._httpServices.patch(this.currentUserServiceUrl, user);
  }

  public uploadUserAvatar(userAvatar: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', userAvatar);
    return this._httpServices.patch(
      `${this.currentUserServiceUrl}/avatar`,
      formData,
    );
  }

  public uploadUserCover(userAvatar: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', userAvatar);
    return this._httpServices.patch(
      `${this.currentUserServiceUrl}/cover`,
      formData,
    );
  }

  public getListMyFavorite(): Observable<FavoriteSong[]> {
    return this._httpServices.get(`${this.currentUserServiceUrl}/favorites`);
  }

  public addSongToFavorite(songId: string): Observable<FavoriteSong> {
    const params: any = {
      songId,
    };
    return this._httpServices.post(
      `${this.currentUserServiceUrl}/favorites`,
      params,
    );
  }

  public removeFavorite(songId: string): Observable<{}> {
    return this._httpServices.delete(
      `${this.currentUserServiceUrl}/favorites/${songId}`,
    );
  }

  public changePassword(passwordForm: PasswordForm): Observable<any> {
    return this._httpServices.patch(
      `${this.currentUserServiceUrl}/password`,
      passwordForm,
    );
  }

  public forgotPassword(emailForm: EmailForm): Observable<any> {
    return this._httpServices.post(
      `${this.serviceUrl}/forgot-password`,
      emailForm,
    );
  }

  public resetPassword(password: string, token: string): Observable<any> {
    return this._httpServices.post(
      `${this.serviceUrl}/reset-password/${token}`,
      { password },
    );
  }

  public getUserProfile(userId: string): Observable<RegisteredUser> {
    return this._httpServices.get(`${this.serviceUrl}/${userId}`);
  }

  public getUserStation(userId: string): Observable<StationItem[]> {
    return this._httpServices.get(`${this.serviceUrl}/${userId}/stations`);
  }

  public getUserRecentStation(userId: string): Observable<StationItem[]> {
    return this._httpServices.get(`${this.serviceUrl}/${userId}/recent-station`);
  }
}
