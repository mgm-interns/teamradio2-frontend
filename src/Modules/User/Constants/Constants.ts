export const DEFAULT_USER_AVATAR = '/img/avatars/default.svg';
export const DEFAULT_USER_COVER_PHOTO = '/img/profile-cover.jpg';
export const MAXIMUM_IMAGE_TO_MB = 3;
export const MAXIMUM_IMAGE_TO_BYTE = MAXIMUM_IMAGE_TO_MB * 1024 * 1024; // 3MB
export const MAXIMUM_RECEIVED_MESSAGE = 1000;
export const LOGIN_SUCCESS_MESSAGE = 'Login successfully!';
export const LOGOUT_SUCCESS_MESSAGE = 'Logout successfully!';
export enum LoginSource {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  PASSWORD = 'password',
}
