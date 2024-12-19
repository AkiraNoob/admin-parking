import { IUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const getUserById = (id: string) => httpRequest.get<IUserInformation>(`/users/${id}`);
