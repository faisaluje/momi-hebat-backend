import { PenggunaPeran } from '../../pengguna/enums/pengguna-peran';
import mongoose from 'mongoose';

export interface JwtPayload {
  id: string;
  username: string;
  nama: string;
  noHp: string;
  peran: PenggunaPeran;
  periode: mongoose.Types.ObjectId;
}
