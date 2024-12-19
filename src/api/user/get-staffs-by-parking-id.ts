import { IPaginationResponse } from 'src/types/common.types';
import { IUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getStafsByParkingLotId = (parkingLotId: number) =>
  httpRequest.get<IPaginationResponse<IUserInformation>>(
    `/users/parking-lots/${parkingLotId}/staff`
  );
