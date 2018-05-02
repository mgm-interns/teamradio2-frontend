import { AccessToken } from 'Models';

export interface IHeader {
  'Content-Type': string;
  Authorization?: string;
}

export const createHeaders = (accessToken?: AccessToken): IHeader => {
  const headerParams: IHeader = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    const { access_token, token_type } = accessToken;
    headerParams.Authorization = `${token_type} ${access_token}`;
  }
  return headerParams;
};
