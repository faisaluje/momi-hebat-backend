import { UserPeran } from '../enums/user-peran';

export interface JwtPayload {
  id: string;
  username: string;
  nama: string;
  noHp: string;
  peran: UserPeran;
}
