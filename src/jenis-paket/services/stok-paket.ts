import { UpdateStokOptions } from '../../common/dto/update-stok-options';
import { JenisTransaksi } from '../../common/enums/jenis-transaksi';
import { TransaksiPaketDoc } from '../../transaksi-paket/models/transaksi-paket';
import { JenisPaket } from '../models/jenis-paket';

export class StokPaketService {
  static async updateStokPaket(
    transaksiPaket: TransaksiPaketDoc,
    options: UpdateStokOptions
  ): Promise<void> {
    let multiply = transaksiPaket.jenis == JenisTransaksi.MASUK ? 1 : -1;
    if (options.deleted) {
      multiply = transaksiPaket.jenis == JenisTransaksi.MASUK ? -1 : 1;
    }

    for (const paket of transaksiPaket.pakets) {
      await JenisPaket.findByIdAndUpdate(
        paket.jenisPaket,
        {
          $inc: { stok: paket.jumlah * multiply },
        },
        { session: options.session }
      );
    }
  }
}
