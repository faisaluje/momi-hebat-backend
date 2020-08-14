import { ClientSession } from 'mongoose';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { PaketsService } from '../../paket/services/pakets';
import { PeriodeDoc } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { JenisPaket, JenisPaketDoc } from '../models/jenis-paket';

export class JenisPaketService {
  static async getListJenisPaket(id: string[]): Promise<JenisPaketDoc[]> {
    const listJenisPaket = await JenisPaket.find({
      _id: { $in: id },
    });

    return listJenisPaket;
  }

  static async generateJenisPakets(
    periode: PeriodeDoc,
    session?: ClientSession
  ): Promise<void> {
    const periodeAktif = await PeriodeAktif.getPeriodeAktif();
    if (!periodeAktif) {
      throw new NotFoundError();
    }

    const listJenisPaketExisting = await JenisPaket.find({
      periode: periodeAktif,
    });

    if (listJenisPaketExisting.length > 0) {
      const listJenisPaketNew = await JenisPaket.insertMany(
        listJenisPaketExisting.map((jenisPaket) => ({
          nama: jenisPaket.nama,
          biayaPacking: jenisPaket.biayaPacking,
          barangs: jenisPaket.barangs,
          keterangan: jenisPaket.keterangan,
          status: jenisPaket.status,
          stok: 0,
          periode,
        })),
        { session }
      );

      if (listJenisPaketNew.length > 0) {
        await PaketsService.generatePakets(
          listJenisPaketExisting,
          listJenisPaketNew,
          session
        );
      }
    }
  }
}
