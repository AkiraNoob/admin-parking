import { IPaginationResponse } from 'src/types/common.types';
import { IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getStaffs = () =>
  httpRequest.get<IPaginationResponse<IShortenUserInformation>>(`/users/staffs?status=ACTIVE`);
