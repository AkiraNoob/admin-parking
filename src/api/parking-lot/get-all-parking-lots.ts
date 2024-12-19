import { IParkingLotDetail } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const getAllParkingLots = () => httpRequest.get<IParkingLotDetail[]>(`/api/parking-lots`);
