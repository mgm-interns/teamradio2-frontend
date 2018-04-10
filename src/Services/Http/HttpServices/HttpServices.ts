import axios from 'axios';
import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { localStorageManager } from 'Helpers';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IServerError } from './IServerError';
import { RequestMethod } from './RequestMethod';

export class HttpServices {
  private _httpClient: AxiosInstance;
  private readonly _endPoint: string;

  constructor(endPoint?: string) {
    this._endPoint = endPoint ? endPoint : process.env.REACT_APP_HTTP_END_POINT;
  }

  public beforeSendRequest(showSpinner: boolean = true) {
    if (showSpinner) {
      console.log('show Spinner here');
    }
  }

  public afterSendRequest() {
    console.log('hide Spinner here');
  }

  public get<T>(url: string, queryParams?: object) {
    return this.makeRequest<T>(RequestMethod.Get, url, queryParams);
  }

  public post<T>(url: string, body: object, queryParams?: object) {
    return this.makeRequest<T>(RequestMethod.Post, url, queryParams, body);
  }

  public put<T>(url: string, body: object, queryParams?: object) {
    return this.makeRequest<T>(RequestMethod.Put, url, queryParams, body);
  }

  public patch<T>(url: string, body: object, queryParams?: object) {
    return this.makeRequest<T>(RequestMethod.Patch, url, queryParams, body);
  }

  public delete(url: string, queryParams?: object) {
    return this.makeRequest(RequestMethod.Delete, url, queryParams);
  }

  private makeRequest<T>(
    method: string,
    url: string,
    queryParams?: object,
    body?: object,
    showSpinner: boolean = true,
    needAccessToken: boolean = true,
  ) {
    let request: AxiosPromise<T>;
    this.beforeSendRequest(showSpinner);
    this._httpClient = this.getAxiousInstance();
    switch (method) {
      case RequestMethod.Get:
        request = this._httpClient.get<T>(url, { params: queryParams });
        break;
      case RequestMethod.Post:
        request = this._httpClient.post<T>(url, body, { params: queryParams });
        break;
      case RequestMethod.Put:
        request = this._httpClient.put<T>(url, body, { params: queryParams });
        break;
      case RequestMethod.Patch:
        request = this._httpClient.patch<T>(url, body, { params: queryParams });
        break;
      case RequestMethod.Delete:
        request = this._httpClient.delete(url, { params: queryParams });
        break;

      default:
        throw new Error('Method not supported');
    }
    return new Observable<T>(observer => {
      request
        .then(response => {
          this.afterSendRequest();
          observer.next(response.data);
          observer.complete();
        })
        .catch((err: IServerError) => {
          this.afterSendRequest();
          observer.error(err.response.data.error);
          observer.complete();
        });
    });
  }

  private getAxiousInstance(): AxiosInstance {
    return this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const accessToken = localStorageManager.getAccessToken();
    const headers = this.createHeaders(accessToken);
    const options: AxiosRequestConfig = {
      headers,
      baseURL: this._endPoint,
    };
    return axios.create(options);
  }

  protected createHeaders(accessToken?: string): any {
    const headerParams: any = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headerParams.Authorization = 'Bearer ' + accessToken;
    }
    return headerParams;
  }
}
