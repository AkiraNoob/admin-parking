import { IReview } from 'src/types/parking-lots.type';
import { httpRequest } from '../httpRequest';

export const getReviews = (parkingLotId: string) =>
  httpRequest.get<IReview[]>(`/api/reviews/parking-lots/${parkingLotId}`);
