import { ICreateParkingLotRequest } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const addVehicleType = (data: ICreateParkingLotRequest) =>
  httpRequest.post(`/api/parking-lots`, data);
