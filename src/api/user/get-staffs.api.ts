import { IPaginationResponse } from 'src/types/common.types';
import { EUserStatus, IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getStaffs = (status: EUserStatus) =>
  httpRequest.get<IPaginationResponse<IShortenUserInformation>>(`/users/staffs?status=${status}`);
