import { AccessToken } from 'Models/User';

const accessTokenKey = 'accessToken';

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
  },
};
