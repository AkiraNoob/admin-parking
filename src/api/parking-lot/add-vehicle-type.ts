import { IAddVehicleTypeResponse, IAddVehicleTypeToParkingLot } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const addVehicleType = (data: IAddVehicleTypeToParkingLot) =>
  httpRequest.post<IAddVehicleTypeResponse>(`/api/vehicle-types`, data);
