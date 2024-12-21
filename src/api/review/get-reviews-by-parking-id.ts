
import { IReview } from 'src/types/review.type';
import { httpRequest } from '../httpRequest';

export const getReviews = (parkingLotId: string) =>
  httpRequest.get<IReview[]>(`/api/reviews/parking-lots/${parkingLotId}`);
