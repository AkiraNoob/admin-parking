import { IPaginationResponse } from 'src/types/common.types';
import { IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getStafsByParkingLotId = (parkingLotId: string) =>
  httpRequest.get<IPaginationResponse<IShortenUserInformation>>(
    `/users/parking-lots/${parkingLotId}/staff`
  );
