import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { localStorageManager } from 'Helpers';
import { AccessToken, UnauthorizedUser } from 'Models';
import { Observable } from 'rxjs/Observable';
import { HttpServices } from './HttpServices';
import { RequestMethod } from './RequestMethod';

export class OAuthService extends HttpServices {
  private authorization: string;
  constructor() {
    const endPoint = process.env.REACT_APP_OAUTH_ENDPOINT;
    super(endPoint);
  }

  public post<T>(url: string, body: any, queryParams?: object) {
    return this.makeRequest<T>(RequestMethod.Post, url, queryParams, body);
  }

  public saveToken(accessToken: AccessToken) {
    localStorageManager.setAccessToken(accessToken);
    return accessToken;
  }

  public authorize(user: UnauthorizedUser) {
    return this.post('oauth/token', this.encode(user)).map(this.saveToken);
  }

  public loginWithFacebook(fbAccessToken: string): Observable<AccessToken> {
    this.setAuthorization(fbAccessToken);
    return this.post('login/facebook', {}).map(this.saveToken);
  }

  public setAuthorization(fbAccessToken: string) {
    this.authorization = fbAccessToken;
  }
  protected createAxiosInstance(): AxiosInstance {
    const authorization = this.authorization
      ? this.authorization
      : `Basic ${process.env.REACT_APP_OAUTH_SECRET_KEY}`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authorization,
    };
    const options: AxiosRequestConfig = {
      headers,
      baseURL: this._endPoint,
    };
    return axios.create(options);
  }

  private encode(userObj: any) {
    return Object.keys(userObj)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(userObj[key]);
      })
      .join('&');
  }
}
