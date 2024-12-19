import { EUserStatus, IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getMerchants = () =>
  httpRequest.get<IShortenUserInformation[]>(`/users/merchants?status=${EUserStatus.ACTIVE}`);
