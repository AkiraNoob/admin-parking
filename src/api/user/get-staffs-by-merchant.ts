import { IPaginationResponse } from 'src/types/common.types';
import { IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getStaffsByMerchant = (merchantId: string) =>
  httpRequest.get<IPaginationResponse<IShortenUserInformation>>(
    `/users/merchants/${merchantId}/staff`
  );
