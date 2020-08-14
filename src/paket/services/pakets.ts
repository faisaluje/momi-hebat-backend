import mongoose from 'mongoose';
import { ClientSession } from 'mongoose';

import { BadRequestError } from '../../common/errors/bad-request-error';
import { JenisPaketDoc } from '../../jenis-paket/models/jenis-paket';
import { JenisPaketService } from '../../jenis-paket/services/jenis-paket';
import { PaketsDoc } from '../../transaksi-paket/models/transaksi-paket';
import { Paket } from '../models/paket';

export class PaketsService {
  static async getPakets(pakets: PaketsDoc[]): Promise<PaketsDoc[]> {
    const listJenisPaket = await JenisPaketService.getListJenisPaket(
      pakets.map((paket) => paket.jenisPaket)
    );

    const listPakets: PaketsDoc[] = pakets.map((paket) => {
      const jenisPaket = listJenisPaket.find((jenisPaket) =>
        mongoose.Types.ObjectId(jenisPaket._id).equals(paket.jenisPaket)
      );
      if (!jenisPaket) throw new BadRequestError('Paket tidak ditemukan');

      return { ...paket };
    });

    return listPakets;
  }

  static async generatePakets(
    listJenisPaket: JenisPaketDoc[],
    listJenisPaketNew: JenisPaketDoc[],
    session?: ClientSession
  ): Promise<void> {
    const listPaketExisting = await Paket.find({
      jenisPaket: { $in: listJenisPaket },
    }).populate('jenisPaket');

    if (listPaketExisting.length > 0) {
      await Paket.insertMany(
        listPaketExisting.map((paket) => ({
          nama: paket.nama,
          harga: paket.harga,
          cashback: paket.cashback,
          jenisPaket: listJenisPaketNew.find(
            (jenisPaketNew) => jenisPaketNew.nama === paket.jenisPaket.nama
          ),
          bgColor: paket.bgColor,
          status: paket.status,
        })),
        { session }
      );
    }
  }
}
