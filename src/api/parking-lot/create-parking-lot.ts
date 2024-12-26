import { ICreateParkingLotRequest } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const createParkingLot = (data: ICreateParkingLotRequest) =>
  httpRequest.post(`/api/parking-lots`, data);
