import { AccessToken, RegisteredUser } from 'Models/User';
import { Volume } from 'Models/Volume';

const accessTokenKey = 'accessToken';
const userInfoKey = 'userInfo';
const loginByKey = 'loginBy';
const playerVolumeKey = 'playerVolume';
const previewVolumeKey = 'previewVolume';
const isUserMutePlayerKey = 'isUserMutePlayer';

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
  setVolumeSource: (soure: Volume) => {
    localStorage.setItem(playerVolumeKey, String(soure.playerVolume));
    localStorage.setItem(previewVolumeKey, String(soure.previewVolume));
    localStorage.setItem(isUserMutePlayerKey, String(soure.isUserMutePlayer));
  },
  getVolumeSource: () => {
    const volume = {
      [playerVolumeKey]: JSON.parse(localStorage.getItem(playerVolumeKey)),
      [previewVolumeKey]: JSON.parse(localStorage.getItem(previewVolumeKey)),
      [isUserMutePlayerKey]: JSON.parse(
        localStorage.getItem(isUserMutePlayerKey),
      ),
    };
    return volume;
  },
};
