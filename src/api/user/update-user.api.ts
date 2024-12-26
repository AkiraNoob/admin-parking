import { IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const updateUser = (
  body: Partial<IShortenUserInformation> & { id: IShortenUserInformation['id'] }
) => {
  const { id, ...updateData } = body;
  return httpRequest.patch<IShortenUserInformation>(`/users/${id}`, updateData);
};
