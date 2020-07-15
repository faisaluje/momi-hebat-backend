import { ClientSession } from 'mongoose'

import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { TransaksiKartuPaketDoc } from '../../transaksi-kartu-paket/models/transaksi-kartu-paket'
import { KartuPaket } from '../models/kartu-paket'

interface updateStokKartuPaketOptions {
  deleted?: boolean;
  session?: ClientSession;
}

export class StokKartuPaketService {
  static async updateStokKartuPaket(
    transaksiKartuPaket: TransaksiKartuPaketDoc,
    options: updateStokKartuPaketOptions
  ): Promise<void> {
    let multiple = transaksiKartuPaket.jenis == JenisTransaksi.MASUK ? 1 : -1;
    if (options.deleted) {
      multiple = transaksiKartuPaket.jenis == JenisTransaksi.MASUK ? -1 : 1;
    }

    for (const item of transaksiKartuPaket.items) {
      await KartuPaket.findOneAndUpdate(
        {
          _id: item.kartuPaket,
        },
        {
          $inc: { stok: item.jumlah * multiple },
        },
        { session: options.session }
      );
    }
  }
}
