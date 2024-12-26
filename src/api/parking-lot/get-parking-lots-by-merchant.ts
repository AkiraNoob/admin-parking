import { IParkingLotDetail } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const getParkingLotsByMerchant = (merchantId: string) => {
  return httpRequest.get<IParkingLotDetail[]>(`/api/parking-lots/merchant/${merchantId}`);
};
