import { IAddParkingSlotRequest, IAddParkingSlotResponse } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const addParkingSlot = (body: IAddParkingSlotRequest) => {
  const { parkingLotId, ...data } = body;
  return httpRequest.post<IAddParkingSlotResponse>(
    `/api/parking-lots/${parkingLotId}/parking-slots`,
    data
  );
};
