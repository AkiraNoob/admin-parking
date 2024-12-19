import { IGetVehicleTypesResponse } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const getVehicleTypes = (id: string) =>
  httpRequest.get<IGetVehicleTypesResponse>(`/api/parking-lots/${id}/vehicles`);
