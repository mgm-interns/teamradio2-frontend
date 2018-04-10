export const localStorageManager = {
  getAccessToken: (): string => {
    return localStorage.getItem('accessToken');
  },
  setAccessToken: (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
  }
};
