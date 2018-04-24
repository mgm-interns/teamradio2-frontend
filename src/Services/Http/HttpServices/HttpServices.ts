import axios from 'axios';
import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { localStorageManager } from 'Helpers';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { createHeaders } from 'Services/Helpers';
import { IServerError } from './IServerError';
import { RequestMethod } from './RequestMethod';

export class HttpServices {
  protected readonly _endPoint: string;
  private _httpClient: AxiosInstance;

  constructor(endPoint?: string) {
    this._endPoint = endPoint ? endPoint : process.env.REACT_APP_HTTP_END_POINT;
  }

  public beforeSendRequest(showSpinner: boolean = true) {
    if (showSpinner) {
    }
  }

  public afterSendRequest() {}

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

  protected createAxiosInstance(): AxiosInstance {
    const accessToken = localStorageManager.getAccessToken();
    const headers = createHeaders(accessToken);
    const options: AxiosRequestConfig = {
      headers,
      baseURL: this._endPoint,
    };
    return axios.create(options);
  }

  protected makeRequest<T>(
    method: string,
    url: string,
    queryParams?: object,
    body?: any,
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
          observer.error(this.getServerErrorMessage(err));
          observer.complete();
        });
    });
  }

  private getAxiousInstance(): AxiosInstance {
    return this.createAxiosInstance();
  }

  private isUnhandledServerError(err: any) {
    return !err || !err.response || typeof err.response.data === 'string';
  }

  private getServerErrorMessage(err: IServerError): string {
    if (this.isUnhandledServerError(err)) {
      return 'Something went wrong. Please try again later';
    }
    const errResponseData = err.response.data;
    return errResponseData.error_description
      ? errResponseData.error_description
      : errResponseData.error;
  }
}
