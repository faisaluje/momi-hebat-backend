import { UserPeran } from '../../pengguna/enums/user-peran';

export interface JwtPayload {
  id: string;
  username: string;
  nama: string;
  noHp: string;
  peran: UserPeran;
}
