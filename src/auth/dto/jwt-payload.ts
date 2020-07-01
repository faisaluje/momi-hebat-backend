import { PenggunaPeran } from '../../pengguna/enums/pengguna-peran';
import { PeriodeDoc } from '../../periode/models/periode';

export interface JwtPayload {
  id: string;
  username: string;
  nama: string;
  noHp: string;
  peran: PenggunaPeran;
  periode: PeriodeDoc | null;
}
