import { EParkingLotStatus, ICreateParkingLotRequest } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const updateParkingLot = (
  body: Partial<ICreateParkingLotRequest> & {
    id: number;
    status?: EParkingLotStatus;
  }
) => {
  const { id, ...data } = body;

  return httpRequest.patch(`/api/parking-lots/${id}`, data);
};
