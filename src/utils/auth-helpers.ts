import Cookies from 'js-cookie';
import { IAuthResponse } from 'src/types/auth.types';
import { checkNullish } from './check-variable';

export enum EAuthCookiesKey {
  Token = 'accessToken',
  Refresh = 'refreshToken',
}

export enum EUserInfoKey {
  UserId = 'userId',
}

export function getAccessToken(): string | null {
  let accessToken = null;

  accessToken = checkNullish(Cookies.get(EAuthCookiesKey.Token));

  return accessToken;
}

export function getRefreshToken(): string | null {
  let refreshToken = null;
  refreshToken = checkNullish(Cookies.get(EAuthCookiesKey.Refresh));

  return refreshToken;
}

export const setAuthCookies = (props: IAuthResponse) => {
  const { accessToken, refreshToken } = props;
  Cookies.set(EAuthCookiesKey.Token, accessToken, {
    expires: 7 * 24 * 60 * 60,
  });
  Cookies.set(EAuthCookiesKey.Refresh, refreshToken, {
    expires: 7 * 24 * 60 * 60,
  });
};

export const setUserLocalStorage = (props: IAuthResponse) => {
  localStorage.setItem(EUserInfoKey.UserId, props.userId);
};

export const clearCookiesAndLocalStorage = () => {
  Cookies.remove(EAuthCookiesKey.Token);
  Cookies.remove(EAuthCookiesKey.Refresh);
  localStorage.clear();
};

export const checkExistsTokens = (): boolean => !!getRefreshToken() && !!getAccessToken();
