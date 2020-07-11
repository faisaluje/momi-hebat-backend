import { ClientSession } from 'mongoose'

import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { TransaksiBarangDoc } from '../../transaksi-barang/models/transaksi-barang'
import { StokBarang } from '../models/stok-barang'

interface upsertStokBarangOptions {
  deleted?: boolean;
  session?: ClientSession;
}

export class StokBarangService {
  static async upsertStokBarang(
    transaksiBarang: TransaksiBarangDoc,
    options: upsertStokBarangOptions
  ): Promise<void> {
    let multiple = transaksiBarang.jenis == JenisTransaksi.MASUK ? 1 : -1;
    if (options.deleted) {
      multiple = transaksiBarang.jenis == JenisTransaksi.MASUK ? -1 : 1;
    }

    for (const item of transaksiBarang.items) {
      await StokBarang.findOneAndUpdate(
        {
          barang: item.barang,
          periode: transaksiBarang.periode,
        },
        {
          $inc: { jumlah: item.jumlah * multiple },
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
