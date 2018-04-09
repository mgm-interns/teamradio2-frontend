export const localStorageManager = {
  getAccessToken: (): string => {
    return localStorage.getItem('accessToken');
  }
};
