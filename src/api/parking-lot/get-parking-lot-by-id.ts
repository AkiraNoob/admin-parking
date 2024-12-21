import { IGetParkingLotDetailResponse } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const getParkinglotByID = (parkinglotId: string) => {
  return httpRequest.get<IGetParkingLotDetailResponse>(
    `/api/parking-lots/${parkinglotId}`
  );
};
