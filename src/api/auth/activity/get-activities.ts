import { httpRequest } from 'src/api/httpRequest';
import { IActivity } from 'src/types/activity';


export const getActivities = (userId: string) => httpRequest.get<IActivity[]>(`/activities/user?userId=${userId}`);
