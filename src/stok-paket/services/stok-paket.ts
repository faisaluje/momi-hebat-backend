import { ClientSession } from 'mongoose'

import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { TransaksiPaketDoc } from '../../transaksi-paket/models/transaksi-paket'
import { StokPaket } from '../models/stok-paket'

interface upsertStokPaketOptions {
  deleted?: boolean;
  session?: ClientSession;
}

export class StokPaketService {
  static async upsertStokPaket(
    transaksiPaket: TransaksiPaketDoc,
    options: upsertStokPaketOptions
  ): Promise<void> {
    let multiple = transaksiPaket.jenis == JenisTransaksi.MASUK ? 1 : -1;
    if (options.deleted) {
      multiple = transaksiPaket.jenis == JenisTransaksi.MASUK ? -1 : 1;
    }

    // await StokPaket.createCollection();

    for (const paket of transaksiPaket.pakets) {
      await StokPaket.findOneAndUpdate(
        {
          jenisPaket: paket.jenisPaket,
        },
        {
          $inc: { jumlah: paket.jumlah * multiple },
        },
        {
          new: true,
          upsert: true,
          session: options.session,
        }
      );
    }
  }
}

// 080016344663
