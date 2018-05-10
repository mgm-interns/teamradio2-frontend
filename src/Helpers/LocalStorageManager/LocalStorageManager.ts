import { AccessToken, RegisteredUser } from 'Models/User';

const accessTokenKey = 'accessToken';
const userInfoKey = 'userInfo';
const loginByKey = 'loginBy';

export const localStorageManager = {
  getAccessToken: (): AccessToken => {
    const accessToken = localStorage.getItem(accessTokenKey);
    return accessToken ? JSON.parse(accessToken) : null;
  },
  setAccessToken: (token: AccessToken) => {
    localStorage.setItem(accessTokenKey, JSON.stringify(token));
  },
  removeAccessToken: () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(userInfoKey);
  },
  setUserInfo: (userInfo: RegisteredUser) => {
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  },
  getUserInfo: (): RegisteredUser => {
    return JSON.parse(localStorage.getItem(userInfoKey));
  },
  setLoginSource: (source: string) => {
    localStorage.setItem(loginByKey, source);
  },
  getLoginSource: (): string => {
    return localStorage.getItem(loginByKey);
  },
};
