import { AxiosError } from 'axios';
import { IAuthRequest, IAuthResponse } from 'src/types/auth.types';
import { EUserRole } from 'src/types/user.type';
import { setAuthCookies, setUserLocalStorage } from 'src/utils/auth-helpers';
import { httpRequest } from '../httpRequest';

export const postAdminLogin = (body: IAuthRequest) =>
  httpRequest.post<IAuthResponse>('/users/signin', body).then((res) => {
    if (res.role === EUserRole.STAFF || res.role === EUserRole.USER) {
      throw new AxiosError('Not eligible row.');
    }
    setAuthCookies(res);
    setUserLocalStorage(res);
    return res;
  });
