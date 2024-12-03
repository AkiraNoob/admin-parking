import { IAuthRequest, IAuthResponse } from 'src/types/auth.types';
import { setAuthCookies, setUserLocalStorage } from 'src/utils/auth-helpers';
import { httpRequest } from '../httpRequest';

export const postAdminLogin = (body: IAuthRequest) =>
  httpRequest.post<IAuthResponse>('/users/admin/signin', body).then((res) => {
    setAuthCookies(res);
    setUserLocalStorage(res);
    return res;
  });
