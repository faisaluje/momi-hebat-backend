import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { JenisPaketService } from '../../jenis-paket/services/jenis-paket'
import { PaketsDoc } from '../models/transaksi-paket'

export class PaketsService {
  static async getPakets(pakets: PaketsDoc[]): Promise<PaketsDoc[]> {
    const listJenisPaket = await JenisPaketService.getListJenisPaket(
      pakets.map((paket) => paket.jenisPaket)
    );

    const listPakets: PaketsDoc[] = pakets.map((paket) => {
      const jenisPaket = listJenisPaket.find((jenisPaket) =>
        mongoose.Types.ObjectId(jenisPaket._id).equals(paket.jenisPaket.id)
      );
      if (!jenisPaket) throw new BadRequestError('Paket tidak ditemukan');

      return { ...paket, jenisPaket };
    });

    return listPakets;
  }
}
