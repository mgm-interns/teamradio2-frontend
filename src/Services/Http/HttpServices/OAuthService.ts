import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { localStorageManager } from 'Helpers';
import { AccessToken, UnauthorizedUser } from 'Models';
import { HttpServices } from './HttpServices';
import { RequestMethod } from './RequestMethod';

export class OAuthService extends HttpServices {
  constructor() {
    const endPoint = process.env.REACT_APP_OAUTH_ENDPOINT;
    super(endPoint);
  }

  public post<T>(url: string, body: any, queryParams?: object) {
    return this.makeRequest<T>(RequestMethod.Post, url, queryParams, body);
  }

  public authorize(user: UnauthorizedUser) {
    return this.post('oauth/token', this.encode(user)).map(
      (accessToken: AccessToken) => {
        localStorageManager.setAccessToken(accessToken);
        return accessToken;
      },
    );
  }

  protected createAxiosInstance(): AxiosInstance {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.REACT_APP_OAUTH_SECRET_KEY}`,
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
