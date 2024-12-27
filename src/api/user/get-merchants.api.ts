import { EUserStatus, IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getMerchants = (status: EUserStatus) =>
  httpRequest.get<IShortenUserInformation[]>(`/users/merchants?status=${status}`);
