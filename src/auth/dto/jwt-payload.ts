import { PenggunaPeran } from '../../pengguna/enums/pengguna-peran';

export interface JwtPayload {
  id: string;
  username: string;
  nama: string;
  noHp: string;
  peran: PenggunaPeran;
}
