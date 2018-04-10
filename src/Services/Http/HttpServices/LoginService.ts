import { HttpServices } from "./HttpServices";

export class LoginService extends HttpServices {
  constructor() {
    const endPoint = process.env.REACT_APP_LOGIN_ENDPOINT;
    super(endPoint);
  }

  protected createHeaders(accessToken?: string): any {
    const headerParams: any = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (accessToken) {
      headerParams.Authorization = 'Bearer ' + accessToken;
    }
    return headerParams;
  }
}
