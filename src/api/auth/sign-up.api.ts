import { ICreateUserRequest, IUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const postSignUp = (body: ICreateUserRequest) =>
  httpRequest.post<IUserInformation>('/users/signup', body);
